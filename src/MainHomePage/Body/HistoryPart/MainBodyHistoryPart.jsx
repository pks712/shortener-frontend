import Button from '@mui/material/Button';
import { TiFilter } from "react-icons/ti";
import useAllUrls from '../../../coustemHook/useAllUrls';


const MainBodyHistoryPart = ({ setOpenFilterPage}) => {
 

const { urls } = useAllUrls();

  const handleToggle =() =>{
   setOpenFilterPage((prev) => !prev);
  }
  return ( 
    <>
     <div className=" container  flex-col justify-center items-center  pb-1  ">
          <div className="flex w-full items-center justify-between mt-1">
            <div>
              <h1 className="text-xl font-bold">History ({urls?.length || 0})</h1>
            </div>
            <div className="filter">
              <Button className="flex justify-center items-center !bg-blue-600 !text-white !rounded-full !w-[145px] h-11 hover:!bg-pink-500" onClick={handleToggle}>
                <TiFilter className="text-[35px] " /> Filter
              </Button>
            </div>
          </div>
         
        </div>

        </>
  )
}

export default MainBodyHistoryPart 