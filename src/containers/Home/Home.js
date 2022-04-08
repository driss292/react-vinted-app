import Hero from "../../Components/Hero/Hero";
import Items from "../../Components/Items/Items";

const Home = ({ search, token, sort }) => {
  return (
    <>
      <Hero token={token} />
      <Items search={search} sort={sort} />
    </>
  );
};

export default Home;
