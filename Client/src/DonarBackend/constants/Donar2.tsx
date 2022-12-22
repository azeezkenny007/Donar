import { Children, createContext,useContext,useState } from "react";


interface Campaigns{
 CampaignImage:string
 CampaignName:string
 Country:string
 Goal:string
 Raised:string
 percent:string
 typeOfCare:string
}


interface ContextNeeded{
  campaigns:  Campaigns[] | null
  setCampaigns: Dispatch<SetStateAction<Campaigns[] | null>>
}

interface Children{
   children:React.ReactNode
}

export const FirebaseContext = createContext<ContextNeeded | null>(null)

export const FirebaseProvider=async({children}:Children)=>{
 const [campaigns,setCampaigns] = useState<Campaigns[] | null>([])
    return  <FirebaseContext.Provider value={{campaigns,setCampaigns}}>
         {children}
    </FirebaseContext.Provider>
}

export const useFirebase =()=>{
   return useContext(FirebaseContext)
}

