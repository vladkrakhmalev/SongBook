import { Link } from "react-router-dom";

export default function NotFound() {

  return (
    <>
      <h1>Упс, ошибка 404</h1>
      <p>Похоже, что вы перешли на несуществующую страницу</p>
      <Link to='/songs'>На главную</Link>
    </>
  )
}