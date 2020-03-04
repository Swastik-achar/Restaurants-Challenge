import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import Rating from "@material-ui/lab/Rating";
import CardContent from "@material-ui/core/CardContent";
import SearchIcon from "@material-ui/icons/Search";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from "@material-ui/core";
import "./Card.css";
import CardMedia from "@material-ui/core/CardMedia";

export class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      select: "",
      restaurantData: [],
      countries: []
    };
  }
  componentWillReceiveProps(props) {
    const countries = props.restaurants.map(restaurant => restaurant.Country);
    const restaurants = JSON.parse(
      JSON.stringify(props.restaurants).replace(/\s(?=\w+":)/g, "")
    );
    this.setState({
      restaurantData: restaurants,
      countries: [...new Set(countries)]
    });
  }
  handleChange = e => {
    if (e.target.value !== "") {
      const restaurantData = this.state.restaurantData.filter(restaurant =>
        restaurant.Brand.toLowerCase().includes(e.target.value)
      );
      this.setState({ [e.target.name]: e.target.value, restaurantData });
    } else {
      this.setState({ search: "", restaurantData: this.props.restaurants });
    }
  };
  handleSelect = e => {
    const restaurants = JSON.parse(
      JSON.stringify(this.props.restaurants).replace(/\s(?=\w+":)/g, "")
    );
    if (e.target.value !== "") {
      const restaurantData = restaurants.filter(restaurant =>
        restaurant.TopTen.includes(e.target.value)
      );
      console.log(restaurantData);
      this.setState({ restaurantData });
    } else {
      this.setState({ restaurantData: restaurants });
    }
  };
  handleCountry = e => {
    console.log(e.target.value);
    const restaurants = JSON.parse(
      JSON.stringify(this.props.restaurants).replace(/\s(?=\w+":)/g, "")
    );
    if (e.target.value !== "") {
      const restaurantData = restaurants.filter(restaurant => {
        return restaurant.Country == e.target.value;
      });
      console.log(restaurantData);
      this.setState({ restaurantData });
    } else {
      this.setState({
        restaurantData: restaurants
      });
    }
  };
  render() {
    console.log(this.state.restaurantData);
    return (
      <div>
        <div className="restaurants">
          <span style={{ marginLeft: "50px", fontSize: "26px",marginTop:'10px',color:"white"}}>
            <b>Top Ramen Restaurants</b>
          </span>
          <input
            onChange={this.handleChange}
            style={{ width: "500px", height: "40px", marginLeft: "400px",marginTop:'8px', borderRadius:'4px' }}
            type="search"
            value={this.state.search}
            name="search"
            placeholder="  Search For Restaurants.."
          />
          &ensp;&ensp;
          <FormControl style={{ marginTop: "4px",backgroundColor:'white',marginTop:'8px', borderRadius:'4px'  }} variant="outlined">
            <InputLabel>Year</InputLabel>
            <Select
              style={{ width: "90px", height: "40px" }}
              onChange={this.handleSelect}
              name="select"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={2016}>2016</MenuItem>
              <MenuItem value={2015}>2015</MenuItem>
              <MenuItem value={2014}>2014</MenuItem>
              <MenuItem value={2013}>2013</MenuItem>
              <MenuItem value={2012}>2012</MenuItem>
            </Select>
          </FormControl>
          &ensp;&ensp;
          <FormControl style={{ marginTop: "8px",backgroundColor:'white', borderRadius:'4px'  }} variant="outlined">
            <InputLabel>Country</InputLabel>
            <Select
              style={{ width: "150px", height: "40px" }}
              onChange={this.handleCountry}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.state.countries.map((country, i) => {
                return (
                  <MenuItem value={country} key={i}>
                    {country}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <br />
        </div>
        <br />
        <br />
        {this.state.restaurantData !== [] &&
          this.state.restaurantData.map(restaurant => {
            const i = Math.round(Math.random() * 10);
            return (
              <Card
                className="Card"
                key={restaurant.TopTen}
                style={
                  i > 5
                    ? {
                        backgroundImage: `url(
                          "https://glebekitchen.com/wp-content/uploads/2018/04/misoramentop-1.jpg"
                        )`
                      }
                    : {
                        backgroundImage: `url(
                          "https://blog.opentable.com/wp-content/uploads/sites/108/2019/07/Copy-Roka-Akor-Beef-Ramen2-copy.jpeg"
                        )`
                      }
                }
              >
                <CardContent className="card-content">
                  <Typography>
                    <b>Brand: </b> &ensp;
                    {restaurant.Brand}
                  </Typography>
                  <Typography>
                    <b>Variety: </b>&nbsp;
                    {restaurant.Variety}
                  </Typography>
                  <Typography>
                    <b>Style:</b>&ensp;&ensp;&nbsp;
                    {restaurant.Style}
                  </Typography>
                  <Typography>
                    <b>Country: </b>
                    {restaurant.Country}
                  </Typography>
                  <hr />
                  <Typography>
                    <b>Stars:</b>&ensp;&ensp;&ensp;&nbsp;
                    <Rating
                      name="read-only"
                      value={restaurant.Stars}
                      readOnly
                    />
                  </Typography>
                  <Typography>
                    <b>Top Ten:</b>&ensp;
                    {restaurant.TopTen}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants
  };
};
export default connect(mapStateToProps)(Restaurants);
