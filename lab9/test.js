// JavaScript source code

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert
const baseUrl = 'http://shop.qatl.ru/api';
const expect = chai.expect;

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
const validProduct3 = require('./tests/valid/validProduct3')
const validProduct4 = require('./tests/valid/validProduct4')

const existingAliases = []
let existingIds = []
let addedIds = []
const request = require('supertest')(baseUrl)
const NON_EXISTING_ID = -1

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

async function addProduct(product) {
    res = await request
        .post('/addproduct')
        .send(product)
    addedIds.push(res.body.id)
    return res;
}

async function getProducts() {
    res = await request.get('/products')
    return res;
}

async function editProduct(id, editData) {
    res = await request
        .post('/editproduct')
        .send({
            id: id,
            ...editData,
        })       
    return res
}

async function deleteProduct(id) {
    res = await request.get('/deleteproduct?id=' + id)
    return res
}
describe('Products API', () => {
    //удаление после каждого
    afterEach(() => {
        addedIds.forEach(async (id) => {
            const resDel = await deleteProduct(id)
        })
        addedIds = []
    }); 

    it('Получение всех продуктов', async () => {
        const res = await getProducts();
        assert(res.status === 200, 'Ошибка сервера')
        res.body.forEach(product => {
            existingIds.push(product.id)
        })
        assert(res.status == 200, 'Ошибка сервера')
        assert(existingIds != [], 'Не получено ни одного товара')
    })

    it('Добавление продукта и проверка полей', async () => {
        const res = await addProduct(validProduct1)

        let addedPr
        const products = await getProducts()
        products.body.forEach(pr => {
            if (pr.id == res.body.id) {
                addedPr = pr;
            }
        })
        assert(res.body.status === 1, 'Статус 0')
        assert(res.status == 200, 'Ошибка сервера')
        assert(addedPr, 'Продукт не существует')
        checkFields(addedPr, validProduct1)

    })
    
    it('Редактирование добавленного продукта и проверка правильности измененных полей', async () => {
        const editData = validProduct2
        const resAdd = await addProduct(validProduct1);
        assert(resAdd.body.status === 1, 'Статус 0')
        let currId = resAdd.body.id
        const resEdit = await editProduct(currId, editData)
        const res = await getProducts();
        assert(resEdit.body.status == 1, 'Статус 0')
        let currProduct
        res.body.forEach(product => {
            if (product.id == currId) {
                currProduct = product;
            }
        })
        assert(currProduct.id == currId, 'id добавленного продукта не соотетствует id продукта, который был изменен');
        checkFields(currProduct, editData)
    })
    
    it('Проверка поля alias', async () => {
        const firstRes = await addProduct(validProduct1);
        assert(firstRes.status == 200)
        const secondRes = await addProduct(validProduct1);
        assert(secondRes.status == 200)
        const thirdRes = await addProduct(validProduct1);
        assert(thirdRes.status == 200)

        const products = await getProducts();

        const first = products.body.find(product => product.id == firstRes.body.id);
        const second = products.body.find(product => product.id == secondRes.body.id);
        const third = products.body.find(product => product.id == thirdRes.body.id);

        assert(first.alias == "apple-watch-series-7", "Сгенерирован неверный alias");
        assert(second.alias == "apple-watch-series-7-0", "Сгенерирован неверный alias для второго такого же title");
        assert(third.alias == "apple-watch-series-7-0-0", "Сгенерирxован неверный alias для третьего такого же title");
    })
    
    it('Добавление продуктов с невалидными значениями', async () => {
        res = await addProduct(wrongStatus);
        assert(res.status == 200, 'Ошибка сервера')

        res = await addProduct(wrongCategoryId);
        assert(res.status == 200, 'Ошибка сервера')

        res = await addProduct(wrongHit);
        assert(res.status == 200, 'Ошибка сервера')

        res = await addProduct(wrongPrice);
        assert(res.status == 200, 'Ошибка сервера')

        res = await addProduct(wrongOldPrice);
        assert(res.status == 200, 'Ошибка сервера')

        res = await addProduct(wrongKeywords);
        assert(res.status == 200, 'Ошибка сервера')

        res = await addProduct(wrongDescription);
        assert(res.status == 200, 'Ошибка сервера')

        const emptyProduct = {}
        res = await addProduct(emptyProduct)
        assert(res.status == 200, 'Ошибка сервера')

        const allProducts = await getProducts();
        
        allProducts.body.forEach(product => {
            assert(!(addedIds.includes(product.id)), 'В список товаров был добавлен невалидный товар')
        })
    })
    
    it('Удаление несществующего товара', async () => {
        const awayId = 555;
        const res = await deleteProduct(awayId);
        assert(existingIds != [])
        assert(!(existingIds.includes(awayId)), "Товар с таким id существует в списке товаров")
        assert(res.status == 200, "Ошибка сервера")
        assert(res.body.status == 0, "Статус 1");
    })
    
    it('Редактирование несуществующего товара', async () => {
        const awayId = 555
        const editData = validProduct2
        const resEdit = await editProduct(awayId, editData)
        
        const products = await getProducts();
        let awayProduct
        existingIds.forEach(product => {
            if (product.id = awayId) {
                awayProduct = product
            }
        })
        assert(resEdit.status == 200, 'Ошибка сервера')
        assert(awayProduct.id == undefined, 'Отредактировался несуществующий товар')
    })

    it('Изменение параметров валидного продукта на невалидные данные', async () => {
        const addRes = await addProduct(validProduct1)

        let currProd
        let products1 = await getProducts()
        let currProduct
        products1.body.forEach(product => {
            if (product.id == addRes.body.id) {
                currProduct = product;
            }
        })

        let editRes = await editProduct(currProduct, wrongTitle)
        editRes = editProduct(currProduct, wrongHit)
        editRes = editProduct(currProduct, wrongPrice)
        editRes = editProduct(currProduct, wrongCategoryId)
   
        let products2 = await getProducts()
        let editedProduct
        products1.body.forEach(product => {
            if (product.id == addRes.body.id) {
                editedProduct = product;
            }
        })

        assert(editedProduct.title != wrongTitle.title, 'Продукт изменен на невалидный title')
        assert(editedProduct.hit != wrongHit.hit, 'Продукт изменен на невалидный hit')
        assert(editedProduct.price != wrongPrice.price, 'Продукт изменен на невалидный price')
        assert(editedProduct.category_id != wrongCategoryId.category_id, 'Продукт изменен на невалидный categoryId')
    })



    //
}) 