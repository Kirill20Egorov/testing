// JavaScript source code
const { expect } = require('@jest/globals')
const { Car, BACK, ONPLACE, STRAIGHT } = require('./car')



beforeEach(() => {
    car = new Car;
});


describe('Testing the engine', () => {
    
    test('At first car is turned off', () => {
        // act
        let isEngineTurnedOff = car.GetEngineState()

        // assert
        expect(isEngineTurnedOff).toBe(false)
    })

    test('Try to turn off engine after starting', () => {
        car.TurnOnEngine()

        let isEngineTurnedOff = car.TurnOffEngine()

        expect(isEngineTurnedOff).toBe(true)
    })

    test('Check direction', () => {
        // arrange
        let carDirection

        // act
        carDirection = car.GetDirection()

        // assert
        expect(carDirection).toBe(ONPLACE)
    })

    test('Check gear', () => {
        let carGear

        carGear = car.GetGear()

        expect(carGear).toBe(0)
    })

    test('Check speed', () => {
        let carSpeed

        carSpeed = car.GetSpeed()

        expect(carSpeed).toBe(0)
    })

    test('Try turn off engine while engine is turned off', () => {
        let tryOffEngine = car.TurnOffEngine() 

        expect(tryOffEngine).toBe(false)
    })

    test('Try turn on engine after starting engine', () => {
        car.TurnOnEngine()

        let tryTurnOnEngine = car.TurnOnEngine()

        expect(tryTurnOnEngine).toBe(false)
    })

})

describe('Check car params onplace', () => {

    test('Check back gear', () => {
        car.TurnOnEngine()
       
        let isBackGear = car.SetGear(-1)

        expect(isBackGear).toBe(true)
    })

    test('Check first gear', () => {
        car.TurnOnEngine()

        isFirstGear = car.SetGear(1);

        expect(isFirstGear).toBe(true)
    })

    test('We cant set speed in neutral gear', () => {
        car.TurnOnEngine()
        
        let isSetedSpeed = car.SetSpeed(15)

        expect(isSetedSpeed).toBe(false)
    })

    test('We cant set 2 gear without speed', () => {
        car.TurnOnEngine()

        let isSecondGear = car.SetGear(2)

        expect(isSecondGear).toBe(false)
    })

})

describe('Check car params with back direction', () => {

    test('Try to set speed with back gear', () => {
        car.TurnOnEngine()
        car.SetGear(-1)

        let isSetSomeSpeed = car.SetSpeed(20)

        expect(isSetSomeSpeed).toBe(true)
    })

    test('Try to set gear 1 while going back', () => {
        car.TurnOnEngine()
        car.SetGear(-1)
        car.SetSpeed(10)

        let isSetedGear = car.SetGear(1)

        expect(isSetedGear).toBe(false)
    })

    test('Try to set speed while speed > curr with neutral gear', () => {
        car.TurnOnEngine()
        car.SetGear(-1)
        car.SetSpeed(15)
        car.SetGear(0)

        let isSetedSpeed = car.SetSpeed(16)

        expect(isSetedSpeed).toBe(false)
    })

    test('Try to set speed while speed < curr with neutral gear', () => {
        car.TurnOnEngine()
        car.SetGear(-1)
        car.SetSpeed(15)
        car.SetGear(0)

        let isSetedSpeed = car.SetSpeed(10)

        expect(isSetedSpeed).toBe(true)
    })
})


describe('Check driving with straight direction', () => {

    test('Try to check direction while speed > 0 and gear > 0', () => {
        car.TurnOnEngine()
        car.SetGear(1)
        car.SetSpeed(10)

        let carDirection = car.GetDirection()

        expect(carDirection).toBe(STRAIGHT)
    })

    test('Try to check direction while car is stopped', () => {
        car.TurnOnEngine()
        car.SetGear(1)
        car.SetSpeed(10)
        car.SetGear(0)
        car.SetSpeed(0)

        let carDirection = car.GetDirection()

        expect(carDirection).toBe(ONPLACE)
    })

    test('Try to set speed with 1 gear', () => {
        car.TurnOnEngine()
        car.SetGear(1)

        let isSetedSpeed = car.SetSpeed(10)

        expect(isSetedSpeed).toBe(true)
    })

    test('Try to set back gear while goind straight', () => {
        car.TurnOnEngine()
        car.SetGear(1)
        car.SetSpeed(15)

        let isSetedGear = car.SetGear(-1)

        expect(isSetedGear).toBe(false)
    })

    test('Try to set 2 gear', () => {
        car.TurnOnEngine()
        car.SetGear(1)
        car.SetSpeed(20)
        car.SetGear(2)

        isSecondGear = car.SetGear(2)

        expect(isSecondGear).toBe(true)
    })

    test('Try to set 3 gear', () => {
        car.TurnOnEngine()
        car.SetGear(1)
        car.SetSpeed(30)
        car.SetGear(3)

        isThirdGear = car.SetGear(3)

        expect(isThirdGear).toBe(true)
    })

    test('Try to set 3 gear for uncorrect speed for this', () => {
        car.TurnOnEngine()
        car.SetGear(1)
        car.SetSpeed(10)
        car.SetGear(3)

        isThirdGear = car.SetGear(3)

        expect(isThirdGear).toBe(false)
    })

    test('Try to set 4 gear', () => {
        car.TurnOnEngine()
        car.SetGear(1)
        car.SetSpeed(30)
        car.SetGear(3)
        car.SetSpeed(50)
        car.SetGear(4)

        isFourthGear = car.SetGear(4)

        expect(isFourthGear).toBe(true)
    })

    test('Try to set 4 gear for uncorrect speed for this', () => {
        car.TurnOnEngine()
        car.SetGear(1)
        car.SetSpeed(30)
        car.SetGear(4)

        isFourthGear = car.SetGear(4)

        expect(isFourthGear).toBe(false)
    })

    test('Try to set 5 gear', () => {
        car.TurnOnEngine()
        car.SetGear(1)
        car.SetSpeed(30)
        car.SetGear(3)
        car.SetSpeed(50)
        car.SetGear(5)

        isFifthGear = car.SetGear(5)

        expect(isFifthGear).toBe(true)
    })

    test('Try to set 5 gear for uncorrect speed for this', () => {
        car.TurnOnEngine()
        car.SetGear(1)
        car.SetSpeed(30)
        car.SetGear(5)

        isFourthGear = car.SetGear(4)

        expect(isFourthGear).toBe(false)
    })

    test('Try to set underflow speed', () => {
        car.TurnOnEngine()
        car.SetGear(1)
        car.SetSpeed(30)
        car.SetGear(3)
        car.SetSpeed(50)
        car.SetGear(5)

        isGetedSpeed = car.SetSpeed(151)

        expect(isGetedSpeed).toBe(false)
    })

    test('Try to set uncorrect gear', () => {
        car.TurnOnEngine()

        isGearSeted = car.SetGear(12)

        expect(isGearSeted).toBe(false)
    })

    test('Try to get maxspeed', () => {
        car.TurnOnEngine()
        car.SetGear(1)
        car.SetSpeed(20)
        car.SetGear(2)
        car.SetSpeed(30)
        car.SetGear(3)
        car.SetSpeed(40)
        car.SetGear(4)
        car.SetSpeed(60)
        car.SetGear(5)
        car.SetSpeed(150)

        let isGetMaxSpeed = car.SetSpeed(150)

        expect(isGetMaxSpeed).toBe(true)
    })

})


    