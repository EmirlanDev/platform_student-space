namespace NEWS {
  type addNewsRes = void;
  type addNewsReq = {
    image: string;
    title: string;
    descriptions: string[];
  };

  type getAllNewsRes = {
    id: string;
    title: string;
    image: string;
    descriptions: string[];
    createdAt: string;
    updateAt: string;
  };
  type getAllNewsReq = void;

  type delNewsReq = {
    id: string;
  };
  type delNewsRes = void;

  type getNewsByIdReq = string;
  type getNewsByIdRes = {
    id: string;
    image: string;
    title: string;
    descriptions: string[];
    createdAt: string;
  };

  type editNewsReq = {
    image: string;
    title: string;
    descriptions: string[];
  };

  type editNewsRes = void;
}
