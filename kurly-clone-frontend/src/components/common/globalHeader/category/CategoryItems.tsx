import styled from 'styled-components'
import SubCategory from './SubCategory'
import { CategoryType } from './categoryList'
import { useDispatch } from 'react-redux'
import { subMenuUp } from '../../../../features/category/categorySlice'
import { subMenuDown } from '../../../../features/category/categorySlice'
import { currentCategory } from '../../../../features/category/categorySlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { currentSubCategory } from '../../../../features/category/subCategorySlice'

type PropsType = {
  items: CategoryType;
  isWide: boolean;
}

export default function CategoryItems({ items, isWide }: PropsType) {
  const categoryName = useSelector(currentCategory);
  const subCategoryName = useSelector(currentSubCategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    dispatch(subMenuUp(items.text))
  }

  const handleMouseLeave = () => {
    if (categoryName !== items.text) {
      dispatch(subMenuDown())
  }}

  return (
    <CategoryItem
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {return !subCategoryName && navigate(`product/list?category=${items.text}`)}}>
      <Container>
        <ItemImg
          key={items.id}
          src={categoryName === items.text ? items.hoverImg : items.img}
          alt={items.text} 
        />
        <ItemText>{items.text}</ItemText>
      </Container>
      {(isWide && categoryName === items.text)
        && <SubCategoryList>
          {items.subMenu.map((item, index) => {
            return <SubCategory key={index} category={items.text}text={item.text}/>
          })}
        </SubCategoryList> }
          
   
    </CategoryItem>
  )
}

const CategoryItem = styled.li`
  padding: 7px 0px 9px 14px;
  &:hover {
    background-color: rgb(247, 247, 247);
  }
`

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`

const ItemImg = styled.img`
  flex: 0 1 0%;
  width: 24px;
  height: 24px;
`

const ItemText = styled.span`
  flex: 1 1 0%;
  padding: 1px 20px 0px 10px;
  color: rgb(51, 51, 51);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  ${CategoryItem}:hover & {
    font-weight: 500;
    color: rgb(95, 0, 128);
  }
`
const SubCategoryList = styled.ul`
  width: 266px;
  height: 100%;
  position: absolute;
  overflow-y: auto;
  top: -1px;
  left: 249px;
  z-index: 20;
  animation: 0.5s linear 0s 1 normal none;
`