export default function ReviewCard(props) {
  const pp = props.review;
    return (
      <div className="w-[800px] h-[250px] bg-yellow-400 rounded-xl shadow-lg shadow-gray-500 hover:shadow-primary  hover:border-[3px] overflow-hidden flex flex-col justify-around p-4 m-4">
        <h1 className="text-2xl font-bold ">{pp.email}</h1>
        <h2 className="">{pp.productId}</h2>
        <p className="text-3xl font-bold">{pp.rating}</p>
        <p className="w-full h-[100px] bg-primary rounded-2xl p-1">{pp.description}</p>
      </div>
    )
}