const db = require("../config/db");

// ==========================================
// DYNAMIC PACKAGE PRICE CALCULATOR
// ==========================================

const calculatePackagePrice = async (req, res, next) => {
  try {
    const { id } = req.params;

    const people = Math.max(
      1,
      parseInt(req.query.people) || 1
    );

    const days = Math.max(
      1,
      parseInt(req.query.days) || 1
    );

    const season = (req.query.season || "normal").toLowerCase();

    // Get package
    const [packages] = await db.query(
      "SELECT * FROM travel_packages WHERE package_id = ?",
      [id]
    );

    if (packages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Travel package not found"
      });
    }

    const packageData = packages[0];

    // ------------------------------------------
    // Find the package price automatically
    // ------------------------------------------

    const possiblePriceFields = [
      "price",
      "base_price",
      "package_price",
      "amount",
      "cost"
    ];

    let basePrice = null;
    let priceField = null;

    for (const field of possiblePriceFields) {
      if (
        packageData[field] !== undefined &&
        packageData[field] !== null
      ) {
        basePrice = Number(packageData[field]);
        priceField = field;
        break;
      }
    }

    if (basePrice === null || Number.isNaN(basePrice)) {
      return res.status(500).json({
        success: false,
        message: "Package price field not found"
      });
    }

    // ------------------------------------------
    // Seasonal multiplier
    // ------------------------------------------

    let seasonMultiplier = 1;

    if (season === "peak") {
      seasonMultiplier = 1.25;
    } else if (season === "off") {
      seasonMultiplier = 0.85;
    } else {
      seasonMultiplier = 1;
    }

    // ------------------------------------------
    // Number of people discount
    // ------------------------------------------

    let groupMultiplier = 1;

    if (people >= 10) {
      groupMultiplier = 0.85;
    } else if (people >= 5) {
      groupMultiplier = 0.92;
    }

    // ------------------------------------------
    // Duration multiplier
    // ------------------------------------------

    const durationMultiplier = days / 1;

    // ------------------------------------------
    // Calculate final price
    // ------------------------------------------

    const pricePerPerson =
      basePrice *
      seasonMultiplier *
      groupMultiplier *
      durationMultiplier;

    const totalPrice = pricePerPerson * people;

    res.json({
      success: true,

      data: {
        package_id: packageData.package_id,

        package_name:
          packageData.package_name || "Travel Package",

        base_price: Number(basePrice),

        price_field: priceField,

        people,

        days,

        season,

        season_multiplier: seasonMultiplier,

        group_multiplier: groupMultiplier,

        price_per_person: Number(
          pricePerPerson.toFixed(2)
        ),

        total_price: Number(
          totalPrice.toFixed(2)
        )
      }
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// PRICE PREVIEW
// ==========================================

const getPricePreview = async (req, res, next) => {
  try {
    const {
      base_price,
      people = 1,
      season = "normal"
    } = req.query;

    const basePrice = Number(base_price);
    const numberOfPeople = Math.max(
      1,
      parseInt(people)
    );

    if (!basePrice || basePrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid base_price is required"
      });
    }

    let seasonMultiplier = 1;

    if (season === "peak") {
      seasonMultiplier = 1.25;
    } else if (season === "off") {
      seasonMultiplier = 0.85;
    }

    let groupMultiplier = 1;

    if (numberOfPeople >= 10) {
      groupMultiplier = 0.85;
    } else if (numberOfPeople >= 5) {
      groupMultiplier = 0.92;
    }

    const pricePerPerson =
      basePrice *
      seasonMultiplier *
      groupMultiplier;

    const totalPrice =
      pricePerPerson * numberOfPeople;

    res.json({
      success: true,
      data: {
        base_price: basePrice,
        people: numberOfPeople,
        season,
        season_multiplier: seasonMultiplier,
        group_multiplier: groupMultiplier,
        price_per_person: Number(
          pricePerPerson.toFixed(2)
        ),
        total_price: Number(
          totalPrice.toFixed(2)
        )
      }
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  calculatePackagePrice,
  getPricePreview
};