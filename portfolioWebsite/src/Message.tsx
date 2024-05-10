function Message() {
  const name = "David"; // This should be replaced with the actual value you want to display

  if (name) {
    return <h1>Hello {name}</h1>;
  } else {
    return <h1>Hello World</h1>; // Or any other JSX element you want to render
  }
}

export default Message;
