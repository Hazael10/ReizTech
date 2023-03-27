function CountryDetail(props) {
  return (
    <section className="country-detail-container">
      <div className="country-detail-content">
        <>
          <div className="country-detail-right">
            <div className="details">
              <div className="detail-left">
                <p>
                  Name: <span>{props.country.name}</span>
                </p>
                <p>
                  Region: <span>{props.country.region}</span>
                </p>
                <p>
                  Area: <span>{props.country.area}</span>
                </p>
              </div>
            </div>
          </div>
        </>
      </div>
    </section>
  );
}

export default CountryDetail;
