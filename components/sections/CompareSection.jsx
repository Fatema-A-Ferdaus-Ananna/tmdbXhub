"use client";
import CompareSelectCard from "@/components/cards/CompareSelectCard";
import SearchModal from "@/components/cards/SearchModal";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CompareSection({ popularMovie }) {
  const [movieSlots, setMovieSlots] = useState([]);
  const [movieDetailsForSlots, setMovieDetailsForSlots] = useState({});
  const [currentSlotId, setCurrentSlotId] = useState(null); // Tracks the slot for the modal
  const [showSelectedModal, setShowSelectedModal] = useState(false);

  // Add a new movie slot
  function addMovieSlot() {
    const newSlot = { id: uuidv4() };
    setMovieSlots((prevSlots) => [...prevSlots, newSlot]);
  }

  const removeMovieSlot = (id) => {
    setMovieSlots((prevSlots) => prevSlots.filter((slot) => slot.id !== id));
    setMovieDetailsForSlots((prevDetails) => {
      const updatedDetails = { ...prevDetails };
      delete updatedDetails[id];
      return updatedDetails;
    });
  };

  function handleShowModal(slotId) {
    setCurrentSlotId(slotId);
    setShowSelectedModal(true);
  }

  function handleMovieSelection(movieDetails) {
    if (currentSlotId) {
      setMovieDetailsForSlots((prevDetails) => ({
        ...prevDetails,
        [currentSlotId]: movieDetails,
      }));
      setShowSelectedModal(false);
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Compare Movies</h1>
        <button
          onClick={addMovieSlot}
          className="bg-primary-dark text-dark px-6 py-2 rounded-md hover:bg-primary transition-colors cursor-pointer"
        >
          Add Movie +
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {movieSlots.length > 0 ? (
          movieSlots.map((slot) => (
            <CompareSelectCard
              key={slot.id}
              onRemove={() => removeMovieSlot(slot.id)}
              onShowSelectModal={() => handleShowModal(slot.id)}
              movieDetailsForSlot={movieDetailsForSlots[slot.id]}
            />
          ))
        ) : (
          <div className="min-h-[calc(100vh-340px)] flex">
            <p className="text-gray-400 text-center text-xl">
              There is nothing to compare. Add movies to compare... ദ്ദി(˵ •̀ ᴗ -
              ˵ )✧
            </p>
          </div>
        )}
      </div>

      {showSelectedModal && (
        <SearchModal
          setMovieDetailsForSlot={handleMovieSelection}
          setShowSelectedModal={setShowSelectedModal}
          popularMovie={popularMovie}
        />
      )}
    </>
  );
}
