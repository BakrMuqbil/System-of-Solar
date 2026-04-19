// data.js

export const solarData = {
  // 1_ الألواح الشمسية
  solarPanels: [
    { id: 1, brand: "AIKO", capacity: "665W", efficiency: "24.5%", price: 120, name: "AIKO-665W-24.5%" },
    { id: 2, brand: "AIKO", capacity: "645W", efficiency: "22.5%", price: 110, name: "AIKO-645W-22.5%" }
  ],

  // 2_ أجهزة الإنفرتر (17 جهازاً)
  inverters: [
    { id: 1, brand: "Growatt", capacity: "6KW", systemVoltage: "48V", maxSolarPower: 8000, price: 370, name: "Growatt-6KW/V48/mx8k" },
    { id: 2, brand: "Growatt", capacity: "12KW", systemVoltage: "48V", maxSolarPower: 15000, price: 850, name: "Growatt-12KW/V48/mx15k" },
    { id: 3, brand: "Solis", capacity: "6KW", systemVoltage: "48V", maxSolarPower: 9000, price: 850, name: "Solis-6KW/V48/mx9k" },
    { id: 4, brand: "Solis", capacity: "8KW", systemVoltage: "48V", maxSolarPower: 12000, price: 1100, name: "Solis-8KW/V48/mx12k" },
    { id: 5, brand: "Solis", capacity: "12KW", systemVoltage: "48V", maxSolarPower: 18000, price: 1850, name: "Solis-12KW/V48/mx18k" },


    { id: 6, brand: "Sako", capacity: "2KW", systemVoltage: "24V", maxSolarPower: 2000, price: 210, name: "Sako-2KW/V24/mx1.6k" },
    { id: 7, brand: "Sako", capacity: "6.2KW", systemVoltage: "48V", maxSolarPower: 6500, price: 350, name: "Sako-6.2KW/V48/mx6.5k" },
    { id: 8, brand: "Sako", capacity: "11KW", systemVoltage: "48V/96V", maxSolarPower: 11000, price: 800, name: "Sako-11KW-V48/96-mx11k" },
    { id: 9, brand: "Sako", capacity: "4.2KW", systemVoltage: "24V", maxSolarPower: 5000, price: 275, name: "Sako-4.2KW-V24-mx5k" },

    { id: 10, brand: "Lego", capacity: "2KW", systemVoltage: "24V", maxSolarPower: 2000, price: 200, name: "Lego-2KW-V24-mx2.4k" },
   //  { id: 11, brand: "Lego", capacity: "4.2KW", systemVoltage: "24V", maxSolarPower: 5000, price: 255, name: "Lego-4.2KW-V24-mx5k" },
    { id: 12, brand: "Lego", capacity: "6.2KW", systemVoltage: "48V", maxSolarPower: 6500, price: 330, name: "Lego-6.2KW-V48-mx6.5k" },
    { id: 13, brand: "Lego", capacity: "11KW", systemVoltage: "48V", maxSolarPower: 11000, price: 780, name: "Lego-11KW-V48-mx11k" },
    { id: 14, brand: "Deye Hybrid", capacity: "6KW", systemVoltage: "48V", maxSolarPower: 7800, price: 850, name: "Deye-6KW-H-V48-mx7.8k" },
    { id: 15, brand: "Deye Off-Grid", capacity: "6KW", systemVoltage: "48V", maxSolarPower: 6000, price: 550, name: "Deye-6KW-OG-V48-mx6k" },
    { id: 16, brand: "Chisage", capacity: "6KW", systemVoltage: "48V", maxSolarPower: 9000, price: 950, name: "Chisage-6KW-V48-mx9k" },
    { id: 17, brand: "Chisage", capacity: "14KW (3-Phase)", systemVoltage: "384V+", maxSolarPower: 21000, price: 2200, name: "Chisage-14KW-3Ph-mx21k" }
  ],

  // 3_ البطاريات (18 كائن محدثة بالأسماء المختصرة)
  batteries: [
    // Sako
    { id: 1, brand: "Sako", capacity: "5KW", systemVoltage: "48V", price: 700, name: "Sako-5KWh-Li-V48" },
    { id: 2, brand: "Sako", capacity: "10KW", systemVoltage: "48V", price: 1250, name: "Sako-10KWh-Li-V48" },
    { id: 3, brand: "Sako", capacity: "15KW", systemVoltage: "48V", price: 1500, name: "Sako-15KWh-Li-V48" },
    // Lego
    { id: 4, brand: "Lego", capacity: "5KW", systemVoltage: "48V", price: 680, name: "Lego-5KWh-Li-V48" },
    { id: 5, brand: "Lego", capacity: "10KW", systemVoltage: "48V", price: 1230, name: "Lego-10KWh-Li-V48" },
    { id: 6, brand: "Lego", capacity: "15KW", systemVoltage: "48V", price: 1530, name: "Lego-15KWh-Li-V48" },
    // Al-Mark
    { id: 7, brand: "Al-Mark", capacity: "5KW", systemVoltage: "48V", price: 850, name: "AlMark-5KWh-Li-V48" },
    { id: 8, brand: "Al-Mark", capacity: "10KW", systemVoltage: "48V", price: 1500, name: "AlMark-10KWh-Li-V48" },
    { id: 9, brand: "Al-Mark", capacity: "15KW", systemVoltage: "48V", price: 1900, name: "AlMark-15KWh-Li-V48" },
    // Swift
    { id: 10, brand: "Swift", capacity: "5KW", systemVoltage: "48V", price: 850, name: "Swift-5KWh-Li-V48" },
    { id: 11, brand: "Swift", capacity: "10KW", systemVoltage: "48V", price: 1450, name: "Swift-10KWh-Li-V48" },
    { id: 12, brand: "Swift", capacity: "15KW", systemVoltage: "48V", price: 1850, name: "Swift-15KWh-Li-V48" },
    // FELICITY
    { id: 13, brand: "FELICITY", capacity: "5KW", systemVoltage: "48V", price: 900, name: "Felicity-5KWh-Li-V48" },
    { id: 14, brand: "FELICITY", capacity: "10KW", systemVoltage: "48V", price: 1600, name: "Felicity-10KWh-Li-V48" },
    { id: 15, brand: "FELICITY", capacity: "15KW", systemVoltage: "48V", price: 2100, name: "Felicity-15KWh-Li-V48" },
    // Narada
    { id: 16, brand: "Narada", capacity: "4.8KW", systemVoltage: "48V", price: 950, name: "Narada-4.8KWh-Li-V48" },
    // Pylontech
    { id: 17, brand: "Pylontech", capacity: "3.5KW", systemVoltage: "48V", price: 1100, name: "Pylon-3.5KWh-Li-V48" },
    // BVD
    { id: 18, brand: "BYD", capacity: "5KW", systemVoltage: "48V", price: 1300, name: "BYD-5KWh-Li-V48" }
  ]
};
