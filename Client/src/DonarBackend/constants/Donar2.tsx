import { Children, createContext, useContext, useState } from "react";

export interface Campaigns {
  CampaignImage: string;
  CampaignName: string;
  Country: string;
  Goal: string;
  Raised: string;
  percent: string;
  typeOfCare: string;
}

export interface ContextNeeded {
  campaigns: Campaigns[] | null;
  setCampaigns: unknown;
  getHappy: () => void;
}

interface Children {
  children: React.ReactNode;
}

export const FirebaseContext = createContext<ContextNeeded | null>(null);

export const FirebaseProvider = async ({ children }: Children) => {
  const [campaigns, setCampaigns] = useState<Campaigns[] | null>([]);

  function getHappy() {
    console.log("happy is the head that wear the crown");
  }
  return (
    <FirebaseContext.Provider value={{ campaigns, setCampaigns, getHappy }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
