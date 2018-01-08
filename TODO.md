A list of tasks to do before this branch can be merged into `master`.

- [x] Update GlobalFooter with the new CheckIn.create interface
- [x] Add API endpoints to existing/new services (Review, CheckIn, Photo)
- [x] Update CheckInCreateScreen with the new review create API (tmp: all_ratings=0, price=0, currency=AUD)
- [x] Rename CheckInCreate to ReviewCreate
- [x] Store googlePlaceId in the checkIn object
- [x] Manually parse through check-in photos and store them somewhere DDFA API can reference
- [ ] Run data migration on production
- [ ] Update CheckInDetail to show additional information

Once the above is complete, the database schema migration branch can be merged into master and deployed.

- [ ] Add ability to search for check-ins nearby
- [ ] Polish up UI (Android & iOS)
- [ ] Last bit of refactor (ddfa-api, ddfa-rn-app)

Once the above is complete, I can give a working APK to Aaron.

- [ ] Update backend `Photo.check_in_id` to `Photo.review_id`...
- [ ] Add ability cancel check-in (delete - only present if you are the owner)
- [ ] Add ability to go back from check-in
- [ ] Add ability set a price
- [ ] Add ability to set ratings
- [ ] Add ability to upload photos

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
