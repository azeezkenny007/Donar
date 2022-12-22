import { Children, createContext, useContext, useState,useEffect } from "react";
import {app,db} from "../Firebase"
import { collection, getDocs, doc, setDoc } from "firebase/firestore";

export interface Campaigns {
  CampaignImage: string;
  CampaignName: string;
  Country: string;
  Goal: string;
  Raised: string;
  percent: string;
  typeOfCare: string;
  id: string
}

export interface ContextNeeded {
  campaigns: Campaigns[] | null;
  setCampaigns: unknown;

}

interface Children {
  children: React.ReactNode;
}

export const FirebaseContext = createContext<ContextNeeded | null>(null);

export const FirebaseProvider = async ({ children }: Children) => {
  const [campaigns, setCampaigns] = useState<Campaigns[] | null>([]);

     
  useEffect(() => {
   const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "campiagns"));//don't mind me i spelt campaign wrongly from the database so i didn't want to change It
    const colRef = collection(db,"campiagns");

  
     const value = querySnapshot.docs.map((doc)=>{
      setCampaigns([{...campaigns,CampaignImage:doc.data().CampaignImage,CampaignName:doc.data().CampaignName,Country:doc.data().Country, Goal:doc.data().Goal,Raised:doc.data().Raised,typeOfCare:doc.data().typeOfCare,percent:doc.data().percent, id:doc.id,}])
     })
     getUsers()
 
  }},[])
  
  
  
     
     

  return (
    <FirebaseContext.Provider value={{ campaigns, setCampaigns }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
}
