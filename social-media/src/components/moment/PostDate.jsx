import moment from "moment";

function PostDate({ date }) {
  const dayDate = moment(date).format("MMMM Do YYYY");
  const timeSincePosted = moment(date).startOf("minute").fromNow();
  const now = moment();

  if (now > dayDate) {
    return <p className="post-date">{dayDate}</p>;
  } else {
    return <p className="post-date">{timeSincePosted}</p>;
  }
}

export default PostDate;
