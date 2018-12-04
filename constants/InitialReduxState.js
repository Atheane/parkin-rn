export const INITIAL_STATE = {
  user: {
    facebookJson: null,
    emptyAsyncStorage: null,
  },
  data: {
    userPosition: null,
    spots: null,
    watchId: null,
  },
  socket: {
    socketInstance: null,
    userPositionEmitted: null,
    spotsReceived: null,
    selectedSpotSent: null
  },
  nav: null,
}