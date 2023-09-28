function OrderHistoryPage() {
  const handleCheckToken = async () => {
    try {
      const expDate = await checkToken();
      alert(expDate.toLocaleString());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>OrderHistoryPage</h1>
      <button>Check Log In Expiration</button>
    </div>
  );
}

export default OrderHistoryPage;
