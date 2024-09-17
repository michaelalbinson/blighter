-----------------------
articleLink: https://medium.com/airbnb-engineering/personal-data-classification-2d816d8ea516?source=rss----53c7c27702d5---4
articleTitle: Personal Data Classification
createdOn: 2024-09-11T20:25:58.372Z
updatedOn: 2024-09-11T20:25:58.372Z
-----------------------

- airbnb has automation to catalog, detect, and choose a sensitivity classification for data
  - there is a human in the loop for validation of detection and classification
- system measured by
  - recall
  - precision
  - speed
- shift left
  - classification on schema, not on data
  - classification online instead of offline
  - data owner instead of data steward