# PokeQuest App Documentation

## Overview

PokeQuest is a web application that allows users to explore and discover various Pokemon, view their abilities, stats, and other details. It's designed as a basic guide to Pokemon, offering a user-friendly interface to interact with the Pokemon API.

## Setup and Installation

To set up the PokeQuest app on your local machine, follow these steps:

1. Install the dependencies
   `npm install`

2. Run the Application
   `npm run dev`

## Components

### AppContext.js

- Manages global state for the application using React Context and Reducer.
- Centralises state related to Pokmon data, loading states, and search functionality.

### PokemonList.js

- Main component rendering the list of Pokmon.
- Handles fetching of Pokmon list and manages selected Pokmon state for details display.

### PokemonCards.js

- Displays individual Pokmon cards with pagination functionality.
- Handles 'Load More' functionality for displaying additional Pokmon.

### PokemonCard.js

- Represents a single Pokmon in the list.
- Displays the Pokmon's image and name, and triggers detail view on click.

### PokemonDetails.js

- Shows detailed information about the selected Pokmon.
- Renders stats, abilities, and an overall skill level of the Pokmon.

### PokemonSearch.js

- Provides a search input for filtering Pokmon in the list.
- Integrated with global state for search term management.

### Wrapper.js

- A simple container component for consistent styling.

### Logo.js

- Displays the application's logo along with a title and tagline.

### index.js

- Serves as the landing page of the application.
- Hosts the Logo and the main Pokmon list.

### Modal.js

- Reusable modal component for overlay content display.
- Manages open/close states and animations.

### fetch.js

- Contains functions for fetching Pokmon data from the API.
- Includes fetchPokemonList and fetchPokemonDetails.

### helpers.js

- Provides utility functions for string manipulation.
- Includes capitaliseFirstLetter and formatString.
