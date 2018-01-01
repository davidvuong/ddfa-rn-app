A list of tasks to do before this branch can be merged into `master`.

- [x] Update GlobalFooter with the new CheckIn.create interface
- [ ] Add API endpoints to existing/new services (Review, CheckIn, Photo)
- [ ] Update CheckInCreateScreen with the new review create API
- [ ] Rename CheckInCreate to ReviewCreate
- [ ] Add ability cancel check-in (delete - only present if you are the owner)
- [ ] Add ability to go back from check-in
- [ ] Add ability set a price
- [ ] Add ability to set ratings
- [ ] Add ability to upload photos
- [ ] Update CheckInDetail to show additional information
- [ ] Add ability to search for check-ins nearby

Flow:

- Select location to check into
- Make API call to /checkins (storing name, address, lat, lng, googlePlaceId)
- Navigate to review page
  - Can select cancel -> destroys the check-in and that's it
  - Can select back -> exits the review page and navigates back to the Feed page
  - Can write a review
    - Can set rating
    - Can set price and currency
    - Can write comments
    - Can upload photos (multiple, single, camera)
- Navigate to Feed page
  - Select unpublished check-in
    - Can delete the check-in and all associated reviews/photos (only original check-in)
    - Can publish check-in
    - Can edit check-in
- Feed page makes API calls to fetch check-ins
  - Fetch unpublished check-ins (always at the top)
  - Fetch published check-ins
- Select on a check-in on the feed page
  - Navigates to check-in/detailed page
  - Makes API call to fetch all comments, photos, ratings etc.
