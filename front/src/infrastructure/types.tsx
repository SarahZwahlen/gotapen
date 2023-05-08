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
  id: string;
  firstname: string;
  surname: string;
  email: string;
  password: string;
  role: string[];
  companyName: string;
};

export type { Supply, SharingRequest, User };
