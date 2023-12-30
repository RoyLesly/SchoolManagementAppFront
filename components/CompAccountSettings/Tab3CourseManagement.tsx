// ** Icons Imports
import { useSelector } from 'react-redux'
import Page4Results from '../CompAdmin/results/Page4Results'
import { choosenCourse } from '@/Redux/Reducers/sliceDomainSpecialityCourse';


const Tab3CourseManagement = () => {
  
  const storeChoosenCourse = useSelector(choosenCourse);

  return (
    <>
      <Page4Results />
    </>
  )
}
export default Tab3CourseManagement
