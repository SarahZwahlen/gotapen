type Supply = {
  name: string;
  imagePath: string;
  id: string;
  owner: User;
  availability: Boolean;
};

type SharingRequest = {
  id: string;
};

type User = {
  firstname: string;
  surname: string;
  email: string;
  password: string;
  role: string[];
};

export type { Supply, SharingRequest, User };
