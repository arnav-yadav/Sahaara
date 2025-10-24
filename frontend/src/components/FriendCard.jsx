// import { Link } from "react-router";

// const FriendCard = ({friend}) => {
//   return (
//     <div className="card bg-base-200 hover:shadow-md transition-shadow">
//       <div className="card-body p-4">
//         {/* USER INFO */}
//         <div className="flex items-center gap-3 mb-3">
//           <div className="avatar size-12">
//             <img src={friend.profilePic} alt={friend.fullName} />
//           </div>
//           <h3 className="font-semibold truncate">{friend.fullName}</h3>
//         </div>

//         {/* TOPIC BADGES */}
//         <div className="flex flex-wrap gap-1.5 mb-3">
//           {friend.canHelpWith?.map((topic) => (
//             <span
//               key={`can-${topic}`}
//               className="badge badge-secondary text-xs flex items-center gap-1"
//             >
//               {topic}
//             </span>
//           ))}

//           {friend.needsHelpWith?.map((topic) => (
//             <span
//               key={`need-${topic}`}
//               className="badge badge-outline text-xs flex items-center gap-1"
//             >
//               {topic}
//             </span>
//           ))}
//         </div>

//         {/* ACTION BUTTON */}
//         <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
//           Message / Join Session
//         </Link>

//       </div>
      
//     </div>
//   )
// }

// export default FriendCard



import { Link } from "react-router";

const FriendCard = ({friend}) => {
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        {/* TOPIC BADGES */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {friend.canSupport && (
            <span className="badge badge-secondary text-xs flex items-center gap-1">
              Can Support: {friend.canSupport}
            </span>
          )}

          {friend.needSupport && (
            <span className="badge badge-outline text-xs flex items-center gap-1">
              Needs Support: {friend.needSupport}
            </span>
          )}
        </div>

        {/* ACTION BUTTON */}
        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message / Join Session
        </Link>

      </div>
      
    </div>
  )
}

export default FriendCard
