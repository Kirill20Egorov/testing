// JavaScript source code
const { APIrequests } = require('./apirequests.js')
const chai = require('chai');
const assert = chai.assert
const baseUrl = 'http://shop.qatl.ru/api';
const expect = chai.expect;
const request = require('supertest')(baseUrl)


const wrongCategoryId = require('./tests/invalid/wrongCategoryId')
const wrongTitle = require('./tests/invalid/wrongTitle')
const wrongContent = require('./tests/invalid/wrongContent')
const wrongPrice = require('./tests/invalid/wrongPrice')
const wrongOldPrice = require('./tests/invalid/wrongOldPrice')
const wrongStatus = require('./tests/invalid/wrongStatus')
const wrongKeywords = require('./tests/invalid/wrongKeywords')
const wrongDescription = require('./tests/invalid/wrongDescription')
const wrongHit = require('./tests/invalid/wrongHit')

const validProduct1 = require('./tests/valid/validProduct1')
const validProduct2 = require('./tests/valid/validProduct2')
const req = new APIrequests;

async function findProductById(id) {
    const products = await req.getProducts();
    return products.body.find(product => product.id == id);
}

function checkFields(first, second) {
    assert(first.category_id == second.category_id, 'id не совпадают')
    assert(first.title == second.title, 'title не совпадают')
    assert(first.content == second.content, 'content не совпадают')
    assert(first.price == second.price, 'price не совпадают')
    assert(first.old_price == second.old_price, 'old_price не совпадают')
    assert(first.status == second.status, 'status не совпадают')
    assert(first.keywords == second.keywords, 'keywords не совпадают')
    assert(first.description == second.description, 'description не совпадают')
    assert(first.hit == second.hit, 'hit не совпадают')
}

describe('Products API', () => {
    
    afterEach(() => {
        const addedIds = req.getAddedIds()
        addedIds.forEach(async (id) => {
            const resDel = await req.deleteProduct(id)
        })
    }); 
   
    it('Получение всех продуктов', async () => {
        const res = await req.getProducts();
        assert(res.status == 200, 'Ошибка сервера')
        assert(res.body != [], 'Не получено ни одного товара')
    })
 
    it('Добавление продукта и проверка его полей', async () => {
        const res = await req.addProduct(validProduct1)
        let addedPr = await findProductById(res.body.id);
        assert(res.body.status === 1, 'Статус 0')
        assert(res.status == 200, 'Ошибка сервера')
        assert(addedPr, 'Продукт не существует')
        checkFields(addedPr, validProduct1)
    })


    it('Удаление продукта после его добавления', async () => {
        const res = await req.addProduct(validProduct1)
        let addedPr = await findProductById(res.body.id);
        assert(addedPr, 'Продукт не добавился')
        const delRes = await req.deleteProduct(addedPr.id)
        let deletedPr = await findProductById(res.body.id);
        assert(res.body.status === 1, 'Статус 0')
        assert(res.status === 200, 'Ошибка сервера')
        assert(!deletedPr, 'Продукт не удалился')
    })

    it('Редактирование добавленного продукта и проверка правильности измененных полей', async () => {
        const editData = validProduct2
        const resAdd = await req.addProduct(validProduct1);
        assert(resAdd.body.status === 1, 'Статус 0')
        let currId = resAdd.body.id
        const resEdit = await req.editProduct(currId, editData)
        assert(resEdit.body.status == 1, 'Статус 0')
        let currProduct = await findProductById(currId);
        assert(currProduct.id == currId, 'id добавленного продукта не соответствует id продукта, который был изменен');
        checkFields(currProduct, editData)
    })     

  
    it('Проверка поля alias при добавлении продуктов', async () => {
        const firstRes = await req.addProduct(validProduct1);
        assert(firstRes.status == 200)
        const secondRes = await req.addProduct(validProduct1);
        assert(secondRes.status == 200)
        const thirdRes = await req.addProduct(validProduct1);
        assert(thirdRes.status == 200)

        const products = await req.getProducts();

        const first = products.body.find(product => product.id == firstRes.body.id);
        const second = products.body.find(product => product.id == secondRes.body.id);
        const third = products.body.find(product => product.id == thirdRes.body.id);

        assert(first.alias == "apple-watch-se-0-0-0", first.alias);
        assert(second.alias == "apple-watch-se-0-0-0-0", "Сгенерирован неверный alias для второго такого же title");
        assert(third.alias == "apple-watch-se-0-0-0-0-0", "Сгенерирован неверный alias для третьего такого же title");
    })
    
    it('Проверка поля alias при редактировании продуктов', async () => {
        const firstRes = await req.addProduct(validProduct1);
        assert(firstRes.status == 200)
        const secondRes = await req.addProduct(validProduct1);
        assert(secondRes.status == 200)
        const thirdRes = await req.addProduct(validProduct1);
        assert(thirdRes.status == 200)

        let products = await req.getProducts();

        let first = products.body.find(product => product.id == firstRes.body.id);
        let second = products.body.find(product => product.id == secondRes.body.id);
        let third = products.body.find(product => product.id == thirdRes.body.id);

        const fEditRes = await req.editProduct(first.id, validProduct2);
        assert(fEditRes.status == 200)
        const sEditRes = await req.editProduct(second.id, validProduct2);
        assert(sEditRes.status == 200)
        const tEditRes = await req.editProduct(third.id, validProduct2);
        assert(tEditRes.status == 200)

        products = await req.getProducts();

        first = products.body.find(product => product.id == firstRes.body.id);
        second = products.body.find(product => product.id == secondRes.body.id);
        third = products.body.find(product => product.id == thirdRes.body.id);

        assert(first.alias == "galaxy-watches-" + first.id, "Сгенерирован неверный alias");
        assert(second.alias == "galaxy-watches-" + second.id, "Сгенерирован неверный alias для второго такого же title");
        assert(third.alias == "galaxy-watches-" + third.id, "Сгенерирован неверный alias для третьего такого же title");
    })
    
    it('Добавление продуктов с невалидными значениями', async () => {
        res = await req.addProduct(wrongStatus);
        assert(res.status == 200, 'Ошибка сервера')

        res = await req.addProduct(wrongCategoryId);
        assert(res.status == 200, 'Ошибка сервера')

        res = await req.addProduct(wrongHit);
        assert(res.status == 200, 'Ошибка сервера')

        res = await req.addProduct(wrongPrice);
        assert(res.status == 200, 'Ошибка сервера')

        res = await req.addProduct(wrongOldPrice);
        assert(res.status == 200, 'Ошибка сервера')

        res = await req.addProduct(wrongKeywords);
        assert(res.status == 200, 'Ошибка сервера')

        res = await req.addProduct(wrongDescription);
        assert(res.status == 200, 'Ошибка сервера')

        const emptyProduct = {}
        res = await req.addProduct(emptyProduct)
        assert(res.status == 200, 'Ошибка сервера')

        const allProducts = await req.getProducts();

        //при вызове addProduct(product) в addedIds добавляется id 
        allProducts.body.forEach(product => {
            assert(!(req.getAddedIds().includes(product.id)), 'В список товаров был добавлен невалидный товар')
        })
    })
    
    it('Удаление несуществующего товара', async () => {
        const awayId = 555;
        const res = await req.deleteProduct(awayId)
        assert(res.status == 200, 'Ошибка сервера')
        assert(res.body.status == 0, 'Статус 1')
        const deletedUnexistingProduct = await findProductById(awayId)
        assert(!deletedUnexistingProduct, 'Товар с таким id существует в списке товаров')
    })
    
    it('Редактирование несуществующего товара', async () => {
        const awayId = 555
        const editData = validProduct2
        const resEdit = await req.editProduct(awayId, editData)
        let awayProduct = await findProductById(awayId)

        assert(resEdit.status == 200, 'Ошибка сервера')
        assert(!awayProduct, 'Отредактировался несуществующий товар')
    })
    
    it('Изменение параметров валидного продукта на невалидные данные', async () => {
        const addRes = await req.addProduct(validProduct1)

        let currProduct = await findProductById(addRes.body.id);

        let editRes = await req.editProduct(currProduct, wrongTitle)
        editRes = await req.editProduct(currProduct, wrongHit)
        editRes = await req.editProduct(currProduct, wrongPrice)
        editRes = await req.editProduct(currProduct, wrongCategoryId)
   
        let editedProduct = await findProductById(addRes.body.id)

        assert(editedProduct.title != wrongTitle.title, 'Продукт изменен на невалидный title')
        assert(editedProduct.hit != wrongHit.hit, 'Продукт изменен на невалидный hit')
        assert(editedProduct.price != wrongPrice.price, 'Продукт изменен на невалидный price')
        assert(editedProduct.category_id != wrongCategoryId.category_id, 'Продукт изменен на невалидный categoryId')
    })
   
}) 