type Supply = {
  name: string;
  imagePath: string;
  id: string;
  owner: User;
};

type SharingRequest = {
  id: string;
};

type User = {
  firstname: string;
  surname: string;
  email: string;
};

export type { Supply, SharingRequest, User };
