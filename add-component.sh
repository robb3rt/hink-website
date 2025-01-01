#!/bin/bash

COMPONENT=$1

echo "Adding component: $COMPONENT using shadcn..."
npx shadcn add $COMPONENT

if [ $? -eq 0 ]; then
  echo "Component added successfully! Generating stories and presets..."
  node ./scripts/generateStoriesAndPresets.js $COMPONENT
else
  echo "Failed to add component. Skipping story and preset generation."
fi


