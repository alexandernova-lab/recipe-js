import React from "react";

const Ingredients = ({ ingredients }) => {
  return (
    <>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
        Ingredients
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {!!ingredients &&
          ingredients.map((ingredient, index) => (
            <div key={index}>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700">
                {ingredient}
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default Ingredients;
