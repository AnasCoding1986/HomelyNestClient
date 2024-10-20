import PropTypes from 'prop-types'
import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CategoryBox = ({ label, icon: Icon }) => {

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const category = params.get("category");
  console.log(category);

  const handleClick = () => {
    const currentQuery = { category: label };

    const URL = queryString.stringifyUrl({
      url: "/",
      query: currentQuery
    });

    navigate(URL)
  };

  return (
    <div
      onClick={handleClick}
      className={`flex 
        ${category === label ? 'border-b-black text-black' : 'border-transparent text-neutral-500'}
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer`}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
