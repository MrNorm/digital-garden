---
date: "2023-07-09"
title: "Fitness Tracker"
id: "fitness-tracker"
project: "fitness-tracker"
repos: ["https://github.com/mrnorm/fitness-tracker"]
tags: ["code", "fitness-tracker"]
---

# Fitness Tracker 🏋️‍♂️

## Project Goal

Aggregate fitness metrics and goals into a single space where I can reflect within this space but also keep track of my progression automatically. Bringing this data forward into the public space also incentivises me and holds me accountable for my own progression, which is something I have also struggled with.

It's very early days but below is my desired implementation for this feature.

## Implementation Details

### Aggregate API

Initial thinking is to use the `serverless` framework to deploy a function that allows me to authenticate with the Google Fit API and present data via public APIs, ready to be consumed by this site. 

### Goal Tracking

Use the Aggregate API and fixed goals, present a page that uses historical data to predict a goal completion date. If a date is set, describe the amount of change required if a goal is predicted to over or under achieve.

### Reflection / Check-Ins

On top of API consumption, define a new content type here to create and present weekly check-ins or reflections via Obsidian. Weekly reports are still presented even if a check-in or reflection is not present in Obsidian.

### Macro Insights

Depending on what data I can grab from the Google Fit API, present information about my eating habits and detect patterns throughout the year. Given the calculations done, this may need to be done via the Aggregate API.