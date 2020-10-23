'use strict';

(function () {
  const mapFilters = document.querySelector(`.map__filters`);
  const mapFiltersHousingTypeElement = mapFilters.querySelector(`#housing-type`);
  const mapFiltersHousingPriceElement = mapFilters.querySelector(`#housing-price`);
  const mapFiltersHousingRoomsElement = mapFilters.querySelector(`#housing-rooms`);
  const mapFiltersHousingGuestsElement = mapFilters.querySelector(`#housing-guests`);
  const mapFiltersHousingFeaturesElement = mapFilters.querySelector(`#housing-features`).querySelectorAll(`input`);
  const MIN_PRICE_CUT = 10000;
  const MAX_PRICE_CUT = 50000;

  const getFilterConfig = function () {
    const filterConfig = {
      type: mapFiltersHousingTypeElement.value,
      price: mapFiltersHousingPriceElement.value,
      rooms: mapFiltersHousingRoomsElement.value,
      guests: mapFiltersHousingGuestsElement.value,
      features: []
    };

    for (let i = 0; i < mapFiltersHousingFeaturesElement.length; i++) {
      if (mapFiltersHousingFeaturesElement[i].checked) {
        filterConfig.features.push(mapFiltersHousingFeaturesElement[i].value);
      }
    }
    return filterConfig;
  };

  const filterValues = function (sample) {
    return function (ad) {
      if ((ad.offer.type !== sample.type) && (sample.type !== `any`)) {
        return false;
      }

      if ((sample.price === `low`) && (ad.offer.price > MIN_PRICE_CUT)) {
        return false;
      }

      if ((sample.price === `middle`) && ((ad.offer.price < MIN_PRICE_CUT) || (ad.offer.price > MAX_PRICE_CUT))) {
        return false;
      }

      if ((sample.price === `high`) && (ad.offer.price < MAX_PRICE_CUT)) {
        return false;
      }

      if ((ad.offer.rooms !== +sample.rooms) && (sample.rooms !== `any`)) {
        return false;
      }

      if ((sample.guests !== `any`) && (ad.offer.guests > 2)) {
        return false;
      }

      if ((sample.guests !== `any`) && (ad.offer.guests === 0) && (+sample.guests !== 0)) {
        return false;
      }

      if ((sample.guests !== `any`) && (+sample.guests !== ad.offer.guests)) {
        return false;
      }

      if ((sample.features.length > 0) && (ad.offer.features !== sample.features)) {
        for (let feature of sample.features) {
          if (!ad.offer.features.includes(feature)) {
            return false;
          }
        }
      }

      return true;
    };
  };

  const filterAds = function (data) {
    let sample = getFilterConfig();
    const filteredData = data.filter(filterValues(sample));
    return filteredData;
  };

  window.filter = {
    filterAds
  };

})();
