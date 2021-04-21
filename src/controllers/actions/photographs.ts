import { TAlbumBody } from "../../models/album";
import Photograph, { TPhotograph } from "../../models/photograph";
import { getAlbumAction, upadteAlbumAction } from "./albums";
import { ActionResponse } from "./types.help";
import { convertPhotograph } from "../photograph";

// ################## CREATE ######################

type TCreatePhotoAndAddToAlbumActionParams = {
  photograph: TPhotograph;
  albumId: string;
};
export const createPhotoAndAddToAlbumAction = async ({
  photograph,
  albumId,
}: TCreatePhotoAndAddToAlbumActionParams): ActionResponse<TPhotograph> => {
  try {
    const album = await getAlbumAction({ id: albumId });
    //WHAT IF album is ERROR?
    if (album) {
      const photo = await Photograph.create(photograph);
      const newPhoto = convertPhotograph(photo);
      const updatedAlbum = await upadteAlbumAction({
        id: albumId,
        album: {
          ...album,
          photos: [newPhoto.id, ...album.photos],
        },
      });
      return newPhoto;
    }
    throw new Error(`There is no album with id=${albumId}`);
  } catch (e) {
    throw new Error(e);
  }
};

// ################## READ ###################### TODO
// ################## UPADTE ###################### TODO
// ################## DELETE ###################### TODO
