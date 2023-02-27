function removeTags(e, setTags, tags) {
  const filteredTags = tags.filter((tag) => tag !== e.target.value);
  setTags(filteredTags);
}

export default removeTags;
