import { chatSession } from "@/components/services/aiModal";
import React, { useState, useRef } from "react";

const Createtrip = () => {
  const [options, setOptions] = useState([]); // List of suggestions
  const [inputValue, setInputValue] = useState(""); // Value of the input box
  const [selectedPlace, setSelectedPlace] = useState(null); // Selected place
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedTravelType, setSelectedTravelType] = useState("");
  const [tripDetails, setTripDetails] = useState(null); // State to hold the generated trip details
  const daysRef = useRef(); // Ref for the number of days input

  const handleBudgetSelect = (value) => {
    setSelectedBudget(value);
  };

  const handleTravelTypeSelect = (value) => {
    setSelectedTravelType(value);
  };

  // Fetch places from Geoapify API
  const fetchPlaces = async (input) => {
    if (!input) return;

    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=fc8abf9234c549a0a3079557c4a0a28b`
      );
      const data = await response.json();

      if (data && data.features) {
        const placeOptions = data.features.map((place) => ({
          value: place.properties.place_id, // Ensure value is a string or number
          label: place.properties.formatted,
        }));

        setOptions(placeOptions);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    fetchPlaces(value);
  };

  // Handle selecting a place from the list
  const handleSelectPlace = (place) => {
    setInputValue(place.label);
    setSelectedPlace(place);
    setOptions([]); // Hide suggestions after selection
  };

  const handleGenerateTrip = async () => {
    setTripDetails({
      destination: selectedPlace ? selectedPlace.label : "Not selected",
      days: daysRef.current.value,
      budget: selectedBudget || "Not selected",
      travelType: selectedTravelType || "Not selected",
    });

    const FINAL_PROMPT = `Generate a Travel Plan for Location:${selectedPlace.label} for ${daysRef.current.value} Days for ${selectedTravelType} with a ${selectedBudget} budget. Give me a Hotel Options list with HotelName, Hotel address, prices, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image URL, Geo Coordinates, rating, ticket Pricing, Time & Travel each of the location for 3 days with each day plan with best time to visit in JSON format`;
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell Us Your Travel Preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and your trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          {/* Input Box for Place Search */}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for a place..."
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
          />
          {/* Show suggestions in a list below the input box */}
          {options.length > 0 && (
            <ul className="mt-2 border border-gray-300 rounded-md max-h-60 overflow-auto">
              {options.map((place) => (
                <li
                  key={place.value}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectPlace(place)}
                >
                  {place.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">How Many Number of Days?</h2>
          <input
            ref={daysRef}
            type="Number"
            placeholder="Enter number of days"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">Select Your Budget</h2>
          {/* Custom Budget Dropdown */}
          <div className="relative">
            <div className="border border-gray-300 p-3 rounded-md cursor-pointer">
              {selectedBudget || "Select your budget"}
            </div>

            {/* Dropdown options as cards */}
            <div className="absolute mt-2 w-full bg-white shadow-lg border border-gray-300 rounded-md z-10">
              <ul className="list-none p-0 flex max-sm:flex-col justify-between">
                <li
                  onClick={() => handleBudgetSelect("small")}
                  className="p-4 cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <div className="bg-red-500 p-5 rounded-md shadow-md">
                    <h3 className="font-bold text-lg text-white">Small</h3>
                    <p className="text-sm text-white">
                      Basic budget with a Comfortable Stay
                    </p>
                  </div>
                </li>
                <li
                  onClick={() => handleBudgetSelect("medium")}
                  className="p-4 cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <div className="bg-blue-500 p-5 rounded-md shadow-md">
                    <h3 className="font-bold text-lg text-white">Medium</h3>
                    <p className="text-sm text-white">
                      Comfortable budget for a Little Luxury Vacation
                    </p>
                  </div>
                </li>
                <li
                  onClick={() => handleBudgetSelect("luxury")}
                  className="p-4 cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <div className="bg-green-500 p-5 rounded-md shadow-md">
                    <h3 className="font-bold text-lg text-white">Luxury</h3>
                    <p className="text-sm text-white">
                      Money is not needed, but the experience will be preserved
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Travel Type Selection */}
        <div className="mt-38">
          <h2 className="text-xl my-3 font-medium">Select Your Travel Type</h2>
          {/* Custom Travel Type Dropdown */}
          <div className="relative">
            <div className="border border-gray-300 p-3 rounded-md cursor-pointer">
              {selectedTravelType || "Select your travel type"}
            </div>

            {/* Dropdown options as cards */}
            <div className="absolute mt-2 w-full bg-white shadow-lg border border-gray-300 rounded-md z-10">
              <ul className="list-none p-0 flex max-sm:flex-col justify-between">
                <li
                  onClick={() => handleTravelTypeSelect("solo")}
                  className="p-4 cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <div className="bg-red-500 p-5 rounded-md shadow-md">
                    <h3 className="font-bold text-lg text-white">
                      Solo Traveler
                    </h3>
                    <p className="text-sm text-white">
                      Ideal for a self-paced journey.
                    </p>
                  </div>
                </li>
                <li
                  onClick={() => handleTravelTypeSelect("couple")}
                  className="p-4 cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <div className="bg-blue-500 p-5 rounded-md shadow-md">
                    <h3 className="font-bold text-lg text-white">Couple</h3>
                    <p className="text-sm text-white">
                      A romantic vacation for two.
                    </p>
                  </div>
                </li>
                <li
                  onClick={() => handleTravelTypeSelect("family")}
                  className="p-4 cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <div className="bg-green-500 p-5 rounded-md shadow-md">
                    <h3 className="font-bold text-lg text-white">
                      Family & Friends
                    </h3>
                    <p className="text-sm text-white">
                      Fun-filled trip for all.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="mt-50 mb-10 flex justify-center">
          <button
            className="bg-blue-500 text-white font-bold py-3 px-10 rounded-lg hover:bg-blue-400 transition-all"
            onClick={handleGenerateTrip}
          >
            Generate Trip
          </button>
        </div>
      </div>

      {/* Display Generated Trip Details */}
      {tripDetails && (
        <div className="mt-10 p-5 border border-gray-300 rounded-md">
          <h3 className="font-bold text-2xl">Generated Trip Details</h3>
          <p>
            <strong>Destination:</strong> {tripDetails.destination}
          </p>
          <p>
            <strong>Number of Days:</strong> {tripDetails.days}
          </p>
          <p>
            <strong>Budget:</strong> {tripDetails.budget}
          </p>
          <p>
            <strong>Prompts:</strong> {tripDetails.FINAL_PROMPT}
          </p>
        </div>
      )}
    </div>
  );
};

export default Createtrip;
