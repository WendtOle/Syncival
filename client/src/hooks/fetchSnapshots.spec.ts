const mockGetSnapshots = jest.fn();

import { PlaylistInformation, Track } from "../state/types";
import { fetchPlaylists } from "./fetchPlaylists";
import { LIKED_SONGS_PLAYLIST_ID } from "./fetchPlaylists-old";
import { fetchSnapshots } from "./fetchSnapshots";

jest.mock("../state/loadEnvVariables.ts", () => ({
  backendUrl: "dummy-backend-url",
}));
jest.mock("../provider/songs.ts", () => ({
  getPlaylistTracks: mockGetSnapshots,
}));

const playlistInfo: PlaylistInformation = {
  name: "Your summer rewind",
  id: "your-summer-rewind-playlist-id",
  isOwn: false,
  snapShotId: "your-summer-rewind-playlist-snapshot-id",
  snapShotDate: new Date("2024-08-01T00:00:00.000Z"),
};

const track: Track = {
  id: "worth-it-track-id",
  name: "Worth it",
  artists: [{ id: "odnp-artist-id", name: "ODNP" }],
  albumName: "Worth it",
};

const onlyReturnFirstPage = <T>(output: T, page: number, defaultValue: T) =>
  page !== 0 ? defaultValue : output;

describe("useFetchPlaylists", () => {
  it("does not fetch already existing snapshot", async () => {
    //Act
    await fetchSnapshots({
      accessToken: () => "access-token",
      existingSnapshots: { [playlistInfo.snapShotId]: [track] },
      playlistInfo: { [playlistInfo.id]: playlistInfo },
    });

    //Assert
    expect(mockGetSnapshots).not.toHaveBeenCalled();
  });
  it("fetch not existing snapshot", async () => {
    //Arrange
    mockGetSnapshots.mockImplementation((_, page) =>
      onlyReturnFirstPage(Promise.resolve([track]), page, Promise.resolve([]))
    );

    //Act
    await fetchSnapshots({
      accessToken: () => "access-token",
      existingSnapshots: {},
      playlistInfo: { [playlistInfo.id]: playlistInfo },
    });

    //Assert
    expect(mockGetSnapshots).toHaveBeenCalled();
  });
  it.skip("should fetch playlists", async () => {
    // Arrange
    mockGetSnapshots.mockImplementation((_, page) =>
      onlyReturnFirstPage({ [playlistInfo.snapShotId]: playlistInfo }, page, {})
    );

    // Act
    const playlists = await fetchPlaylists({
      accessToken: () => "access-token",
      existingPlaylists: {},
    });

    // Assert
    const { snapShotDate, ...withoutSnapShotDate } = playlistInfo;
    expect(playlists[playlistInfo.id]).toEqual(
      expect.objectContaining(withoutSnapShotDate)
    );
  });
  it.skip("should not update foreign snapShotDate if smaller than 1 day", async () => {
    // Arrange
    const ONE_HOUR = 3600000;
    const playlist = {
      ...playlistInfo,
      snapShotDate: new Date(new Date().getTime() - ONE_HOUR),
      isOwn: false,
    };
    mockGetSnapshots.mockImplementation((_, page) =>
      onlyReturnFirstPage({ [playlist.snapShotId]: playlist }, page, {})
    );

    // Act
    const playlists = await fetchPlaylists({
      accessToken: () => "access-token",
      existingPlaylists: { [playlist.id]: playlist },
    });

    // Assert
    expect(playlists[playlistInfo.id].snapShotDate).toEqual(
      playlist.snapShotDate
    );
  });
  it.skip("should update snapShotDate if bigger than 1 day", async () => {
    // Arrange
    const TWO_DAYS = 172800000;
    const playlist = {
      ...playlistInfo,
      snapShotDate: new Date(new Date().getTime() - TWO_DAYS),
      isOwn: false,
    };
    mockGetSnapshots.mockImplementation((_, page) =>
      onlyReturnFirstPage({ [playlist.snapShotId]: playlist }, page, {})
    );

    // Act
    const playlists = await fetchPlaylists({
      accessToken: () => "access-token",
      existingPlaylists: { [playlist.id]: playlist },
    });

    // Assert
    expect(playlists[playlistInfo.id].snapShotDate).not.toEqual(
      playlist.snapShotDate
    );
  });
});
