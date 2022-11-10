// JavaScript source code
const STRAIGHT = "straight"
const ONPLACE = "onplace"
const BACK = "back"

 
class Car {
    #m_gear = 0
    #m_speed = 0
	#m_isEngineOn = false
	#m_direction = ONPLACE

    GetSpeed() {
        return this.#m_speed
    }

    GetGear() {
        return this.#m_gear
    }

    GetDirection() {
        return this.#m_direction
    }

    GetEngineState() {
        return this.#m_isEngineOn
    }

	TurnOnEngine() {
		if (!this.#m_isEngineOn) {
			this.#m_isEngineOn = true
			return true
		} else {
			return false
		}
	}

	TurnOffEngine() {
		if (this.#m_isEngineOn) {
			this.#m_isEngineOn = false
			return true
		} else {
			return false
		}
	}

    SetGear(gear) {
		switch (gear) {
			case -1:
				{
					if (((this.#m_speed == 0) && (this.#m_direction == ONPLACE)) && (this.#m_isEngineOn == true))
					{
						this.#m_gear = -1
						return true
					}
					return false
				}
			case 0:
				{
					this.#m_gear = 0
				return true
				}
			case 1:
				{
					if (((((this.#m_speed >= 0) && (this.#m_speed <= 30)) && (this.#m_gear >= 0) || (this.#m_gear == 0)) && (this.#m_isEngineOn == true))
						&& (this.#m_direction != BACK))
					{
						this.#m_gear = 1
						return true
					}
					return false
				}
			case 2:
				{
					if (((this.#m_speed >= 20) && (this.#m_speed <= 50)) && (this.#m_isEngineOn == true) && (this.#m_direction != BACK))
					{
						this.#m_gear = 2
						return true
					}
					return false
				}
			case 3:
				{
					if (((this.#m_speed >= 30) && (this.#m_speed <= 60)) && (this.#m_isEngineOn == true) && (this.#m_direction != BACK))
					{
						this.#m_gear = 3
						return true
					}
					return false
				}
			case 4:
				{
					if (((this.#m_speed >= 40) && (this.#m_speed <= 90)) && (this.#m_isEngineOn == true) && (this.#m_direction != BACK))
					{
						this.#m_gear = 4
						return true
					}
					return false
				}
			case 5:
				{
					if ((this.#m_speed >= 50) && (this.#m_isEngineOn == true) && (this.#m_direction != BACK))
					{
						this.#m_gear = 5
						return true
					}
					return false
				}
		}
		return false
	}

	SetSpeed(speed) {
		if ((this.#m_gear == -1) && (speed <= 20) && (speed >= 0)) {
			this.#m_speed = speed
			this.#m_direction = BACK
			return true
		}
		if ((this.#m_gear == 0) && (speed <= this.#m_speed) && (speed >= 0)) {
			this.#m_speed = speed
			if (speed == 0) {
				this.#m_direction = ONPLACE
			}
			return true
		}
		if ((this.#m_gear == 1) && (speed >= 0) && (speed <= 30) && (speed >= 0)) {
			this.#m_speed = speed
			this.#m_direction = STRAIGHT
			return true
		}
		if ((this.#m_gear == 2) && (speed >= 20) && (speed <= 50) && (speed >= 0)) {
			this.#m_speed = speed
			return true
		}
		if ((this.#m_gear == 3) && (speed >= 30) && (speed <= 60) && (speed >= 0)) {
			this.#m_speed = speed
			return true
		}
		if ((this.#m_gear == 4) && (speed >= 40) && (speed <= 90) && (speed >= 0)) {
			this.#m_speed = speed
			return true
		}
		if ((this.#m_gear == 5) && (speed >= 50) && (speed <= 150) && (speed >= 0)) {
			this.#m_speed = speed
			return true
		}
		return false
	}
   
}

module.exports = {
	Car,
	BACK,
	ONPLACE,
	STRAIGHT
}