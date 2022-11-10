// JavaScript source code
const { expect } = require('@jest/globals')
const { Car, BACK, ONPLACE, STRAIGHT } = require('./car')

car = new Car

describe('Create a car and testing the engine', () => {
    
    test('At first car is turned off', () => {
        // act
        let isEngineTurnOff = car.GetEngineState(); 


        // assert
        expect(isEngineTurnOff).toBe(false)
    })

    test('If car is turned off and we call TurnOn should return true, and car will be turned on', () => {
        let 

        expect(car.TurnOffEngine()).toBe(false)
        expect(car.TurnOnEngine()).toBe(true)
        expect(car.GetEngineState()).toBe(true)
        expect(car.TurnOnEngine()).toBe(false)
        expect(car.TurnOffEngine()).toBe(true)
    })
})

describe('Start the engine and check params when the car stay on place', () => {

    test('Check params of car after starting engine', () => {
        expect(car.TurnOnEngine()).toBe(true)
        expect(car.GetSpeed()).toBe(0)
        expect(car.GetGear()).toBe(0)
        expect(car.GetDirection()).toBe(ONPLACE)
    })


    test('If car is turned on we try transmission onplace and check direction and other params', () => {
        expect(car.SetGear(-1)).toBe(true)
        expect(car.GetGear()).toBe(-1)
        expect(car.GetSpeed()).toBe(0)
        expect(car.GetDirection()).toBe(ONPLACE)
        expect(car.SetGear(0)).toBe(true)
        expect(car.SetGear(1)).toBe(true)
        expect(car.GetDirection()).toBe(ONPLACE)
        expect(car.GetSpeed()).toBe(0)
        expect(car.GetGear()).toBe(1)
    })

    test('If car stay on place we cant set speed in neutral gear', () => {
        expect(car.SetGear(0)).toBe(true)
        expect(car.SetSpeed(1)).toBe(false)
        expect(car.SetSpeed(-1)).toBe(false)
        expect(car.GetDirection()).toBe(ONPLACE)
    })

    test('We cant turn on the gears >= 1 when we havent speed', () => {
        expect(car.SetGear(2)).toBe(false)
        expect(car.SetGear(3)).toBe(false)
        expect(car.SetGear(4)).toBe(false)
        expect(car.SetGear(5)).toBe(false)
    })
})

describe('Check driving with back direction', () => {

    test('Try to set speed with back gear', () => {
        expect(car.SetGear(-1)).toBe(true)
        expect(car.SetSpeed(15)).toBe(true)
        expect(car.SetSpeed(-10)).toBe(false)
        expect(car.GetDirection()).toBe(BACK)
        expect(car.SetSpeed(21)).toBe(false)
        expect(car.SetGear(-2)).toBe(false)
    })

    test('Try to set other gears while going back', () => {
        expect(car.SetGear(0)).toBe(true)
        expect(car.SetGear(1)).toBe(false)
        expect(car.SetGear(5)).toBe(false)
    })
    
    test('Try to set speed while > curr and < curr going back with neutral', () => {
        expect(car.SetSpeed(17)).toBe(false)
        expect(car.SetSpeed(0)).toBe(true)
        expect(car.SetGear(1)).toBe(true)
    })
})

describe('Check driving with straight direction', () => {

    test('Try to set speed with 1', () => {
        expect(car.SetSpeed(30)).toBe(true)
        expect(car.SetSpeed(-10)).toBe(false)
        expect(car.GetDirection()).toBe(STRAIGHT)
    })

    test('Try to set other gears while going straight', () => {
        expect(car.SetGear(0)).toBe(true)
        expect(car.SetGear(-1)).toBe(false)
        expect(car.SetGear(5)).toBe(false)
    })

    test('Try to set speed while > curr and < curr going back with neutral', () => {
        expect(car.SetSpeed(31)).toBe(false)
        expect(car.SetSpeed(0)).toBe(true)
        expect(car.GetDirection()).toBe(ONPLACE)
    })

    test('Give more speed and check other gears', () => {
        expect(car.SetGear(1)).toBe(true)
        expect(car.SetSpeed(30)).toBe(true)
        expect(car.SetGear(2)).toBe(true)
        expect(car.SetSpeed(40)).toBe(true)
        expect(car.SetGear(0)).toBe(true)
        expect(car.SetGear(3)).toBe(true)
        expect(car.SetGear(0)).toBe(true)
        expect(car.SetGear(3)).toBe(true)
        expect(car.SetSpeed(50)).toBe(true)
        expect(car.SetGear(4)).toBe(true)
        expect(car.SetSpeed(90)).toBe(true)
        expect(car.SetGear(0)).toBe(true)
        expect(car.SetGear(5)).toBe(true)
        expect(car.SetSpeed(150)).toBe(true)

    })

    test('Try to get max speed and underlimit gear', () => {
        expect(car.SetSpeed(151)).toBe(false)
        expect(car.SetGear(6)).toBe(false)
    })

    test('Try to turn off the car on speed', () => {
        expect(car.TurnOffEngine()).toBe(true)
        expect(car.TurnOnEngine()).toBe(true)
    })

    test('Try to get uncorrect gears for speed', () => {
        expect(car.SetGear(4)).toBe(false)
        expect(car.SetGear(3)).toBe(false)
        expect(car.SetGear(2)).toBe(false)
        expect(car.SetGear(1)).toBe(false)
        expect(car.SetGear(0)).toBe(true)
        expect(car.SetGear(-1)).toBe(false)
    })

    test('Try to get uncorrect speed for every gear', () => {
        expect(car.SetSpeed(80)).toBe(true)
        expect(car.SetGear(4)).toBe(true)
        expect(car.SetSpeed(130)).toBe(false)
        expect(car.SetSpeed(60)).toBe(true)
        expect(car.SetGear(3)).toBe(true)
        expect(car.SetSpeed(90)).toBe(false)
        expect(car.SetSpeed(40)).toBe(true)
        expect(car.SetGear(2)).toBe(true)
        expect(car.SetSpeed(60)).toBe(false)
        expect(car.SetSpeed(20)).toBe(true)
        expect(car.SetGear(1)).toBe(true)
        expect(car.SetSpeed(40)).toBe(false)
        expect(car.SetSpeed(0)).toBe(true)
    })
    
})


    