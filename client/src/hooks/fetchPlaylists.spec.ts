const mockGetPlaylists = jest.fn();

import { PlaylistInformation } from "../state/types";
import { fetchPlaylists } from "./fetchPlaylists";
import { LIKED_SONGS_PLAYLIST_ID } from "./fetchPlaylists-old";

jest.mock("../state/loadEnvVariables.ts", () => ({
  backendUrl: "dummy-backend-url",
}));
jest.mock("../provider/playlists.ts", () => ({
  getPlaylists: mockGetPlaylists,
}));

const playlistInfo: PlaylistInformation = {
  name: "Your summer rewind",
  id: "your-summer-rewind-playlist-id",
  isOwn: false,
  snapShotId: "your-summer-rewind-playlist-snapshot-id",
  snapShotDate: new Date("2024-08-01T00:00:00.000Z"),
};

const onlyReturnFirstPage = <T>(output: T, page: number, defaultValue: T) =>
  page !== 0 ? defaultValue : output;

describe("useFetchPlaylists", () => {
  it("always append liked_songs playlist", async () => {
    //Arrange
    mockGetPlaylists.mockImplementation((_, page) =>
      onlyReturnFirstPage({}, page, {})
    );

    //Act
    const actualPlaylists = await fetchPlaylists({
      accessToken: () => "access-token",
      existingPlaylists: {},
    });

    //Assert
    expect(actualPlaylists).toHaveProperty(LIKED_SONGS_PLAYLIST_ID);
  });
  it("should fetch playlists", async () => {
    // Arrange
    mockGetPlaylists.mockImplementation((_, page) =>
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
  it("should not update foreign snapShotDate if smaller than 1 day", async () => {
    // Arrange
    const ONE_HOUR = 3600000;
    const playlist = {
      ...playlistInfo,
      snapShotDate: new Date(new Date().getTime() - ONE_HOUR),
      isOwn: false,
    };
    mockGetPlaylists.mockImplementation((_, page) =>
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
  it("should update snapShotDate if bigger than 1 day", async () => {
    // Arrange
    const TWO_DAYS = 172800000;
    const playlist = {
      ...playlistInfo,
      snapShotDate: new Date(new Date().getTime() - TWO_DAYS),
      isOwn: false,
    };
    mockGetPlaylists.mockImplementation((_, page) =>
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
