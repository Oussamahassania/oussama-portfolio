export type Certification = {
  id: string;
  issuer: string;
  issuerMark: string;
  title: string;
  issued: string;
  credentialId: string;
  verifyUrl: string;
  note: string;
};

export const certifications: Certification[] = [
  {
    id: "wml",
    issuer: "DeepLearning.AI",
    issuerMark: "DL",
    title: "Advanced Learning Algorithms",
    issued: "November 2026",
    credentialId: "WMKC4Y4AAQZK",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/verify/WMKC4Y4AAQZK",
    note: "Authorized by DeepLearning.AI and Stanford Online · offered through Coursera",
  },
  {
    id: "supervised",
    issuer: "DeepLearning.AI",
    issuerMark: "DL",
    title: "Supervised Machine Learning: Regression and Classification",
    issued: "October 2026",
    credentialId: "LRCIB11X44OD",
    verifyUrl: "https://coursera.org/verify/LRCIB11X44OD",
    note: "Authorized by DeepLearning.AI and Stanford Online · offered through Coursera",
  },
  {
    id: "mockito",
    issuer: "Packt",
    issuerMark: "PK",
    title: "Unit and Mockito Unit Testing for Java Developers",
    issued: "July 2026",
    credentialId: "5ZXW235K5RY7",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/certificate/5ZXW235K5RY7",
    note: "Issuer: Packt · offered through Coursera",
  },
];
