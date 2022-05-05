import React, { useEffect } from "react";
import "./AddListing.css";
import axios from "axios";

import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import OutlineButton from "../../../../components/Buttons/OutlineButton";
import useUploadImage from "../../../../hooks/useUploadImage";
import { getShopAccount } from "../../../../redux/reducers/shopDashboardAccount";


function AddListing({ show, hide }) {

  const [categories, setCategories] = React.useState([]);
  const { imageFile: mainImage, submit: submitMain, fileSelected: mainFileSelected, dispatch } = useUploadImage('listing-photo');
  const { imageFile: imageTwo, submit: submitTwo, fileSelected: fileTwoSelected } = useUploadImage('listing-photo');
  const { imageFile: imageThree, submit: submitThree, fileSelected: fileThreeSelected } = useUploadImage('listing-photo');
  const { imageFile: imageFour, submit: submitFour, fileSelected: fileFourSelected } = useUploadImage('listing-photo');
  const { imageFile: imageFive, submit: submitFive, fileSelected: fileFiveSelected } = useUploadImage('listing-photo');
  const [photoPreviews, setPhotoPreviews] = React.useState([])
  const [currentPhoto, setCurrentPhoto] = React.useState(0);
  const [needsPreviewCreated, setNeedsPreviewCreated] = React.useState(false);

  useEffect(() => {
    setPhotoPreviews([mainImage.preview, imageTwo.preview, imageThree.preview, imageFour.preview, imageFive.preview])
  }, [mainImage, imageTwo, imageThree, imageFour, imageFive])

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        
        setCategories(["Error Retrieving Categories"]);
      });
  }, []);

  const initialValues = {
    title: "",
    description: "",
    price: "",
    shippingPrice: "",
    category: "",
    qtyInStock: ""
  };

  const validation = {
    title: Yup.string()
      .required("Required")
      .max(100, "Must be 100 characters or less"),
    description: Yup.string()
      .required("Required")
      .max(1000, "Must be 1000 characters or less"),
    price: Yup.number().required("Required"),
    shippingPrice: Yup.number().required("Required"),
    category: Yup.string().required("Required"),
    qtyInStock: Yup.number().required("Required")
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(validation)}
      onSubmit={(values, { setSubmitting }) => {

        axios.post("/api/listings", {
          title: values.title,
          description: values.description,
          price: values.price,
          shippingPrice: values.shippingPrice,
          category: values.category,
          qtyInStock: values.qtyInStock,
        })
          .then((res) => {
               
            submitMain(null, `/${res.data.id}?type=main_photo`)
            submitTwo(null, `/${res.data.id}?type=photo_two`)
            submitThree(null, `/${res.data.id}?type=photo_three`)
            submitFour(null, `/${res.data.id}?type=photo_four`)
            submitFive(null, `/${res.data.id}?type=photo_five`)
            hide(false);
          })
          .catch((err) => {
            console.log(err);
            })
          .finally(() => {           
            setSubmitting(false)
            dispatch(getShopAccount())
          });
        
      }}
    >

      <div id="add-listing-pop-up" className={show ? "show" : "hide"}>
        <div
          className="add-listing-pop-up-background"
          onClick={() => hide(false)}
        ></div>
        <div className="add-listing-pop-up">
          <h1 className="add-listing-title">Add Listing</h1>
          <Form id="add-listing-form">
            <div className="add-listing-top">
              <div className="form-left">
                <div className="add-listing-popup-field-container">
                  <label className="label" htmlFor="title">
                    Title
                  </label>
                  <Field
                    className="inputField add-listing"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                  />
                  <ErrorMessage
                    className="errorMsg"
                    name="title"
                    component="h4"
                  />
                </div>
                <div className="add-listing-popup-field-container">
                  <label className="label" htmlFor="description">
                    Description
                  </label>
                  <Field
                    className="inputField add-listing"
                    id="description"
                    name="description"
                    as="textarea"
                    placeholder="Description"
                  />
                  <ErrorMessage
                    className="errorMsg"
                    name="description"
                    component="h4"
                  />
                </div>
                <div className="add-listing-popup-field-container">
                  <label className="label" htmlFor="price">
                    Price
                  </label>
                  <Field
                    className="inputField add-listing"
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Price"
                  />
                  <ErrorMessage
                    className="errorMsg"
                    name="price"
                    component="h4"
                  />
                </div>
                <div className="add-listing-popup-field-container">
                  <label className="label" htmlFor="shippingPrice">
                    Shipping Price
                  </label>
                  <Field
                    className="inputField add-listing"
                    id="shippingPrice"
                    name="shippingPrice"
                    type="number"
                    placeholder="Shipping Price"
                  />
                  <ErrorMessage
                    className="errorMsg"
                    name="shippingPrice"
                    component="h4"
                  />
                </div>
                <div className="add-listing-popup-field-container">
                  <label className="label" htmlFor="category">
                    Category
                  </label>
                  <Field
                    className="inputField add-listing"
                    id="category"
                    name="category"
                    component="select"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories?.map(({ category_name, category_id }) => {
                      return (
                        <option
                          key={category_id + category_name}
                          value={category_id}
                        >
                          {category_name}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage
                    className="errorMsg"
                    name="category"
                    component="h4"
                  />
                </div>
                <div className="add-listing-popup-field-container">
                  <label className="label" htmlFor="qtyInStock">
                    Quantity In Stock
                  </label>
                  <Field
                    className="inputField add-listing"
                    id="qtyInStock"
                    name="qtyInStock"
                    type="number"
                    placeholder="Quantity In Stock"
                  />
                  <ErrorMessage
                    className="errorMsg"
                    name="qtyInStock"
                    component="h4"
                  />
                </div>
              </div>
              <div className="form-right">
                <div className="photo-input-container">
                  <div className="add-listing-popup-field-container">
                    <label className="label" htmlFor="mainPhoto">
                      Main Photo
                    </label>
                    <input
                      className="inputField add-listing photo"
                      id="mainPhoto"
                      name="photos.mainPhoto"
                      type="file"
                      accept='image/*'
                      onChange={(e) =>  {
                        mainFileSelected(e)
                        setNeedsPreviewCreated(true)
                        }}                     
                    />
                    <ErrorMessage
                      className="errorMsg"
                      name="photos.mainPhoto"
                      component="h4"
                    />
                  </div>
                  <div className="add-listing-popup-field-container">
                    <label className="label" htmlFor="photoTwo">
                      Photo 2
                    </label>
                    <input
                      className="inputField add-listing photo"
                      id="photoTwo"
                      name="photos.photoTwo"
                      type="file"
                      accept='image/*'
                      onChange={(e) =>  {
                        fileTwoSelected(e)
                        setNeedsPreviewCreated(true)
                        }}    
                    />
                    <ErrorMessage
                      className="errorMsg"
                      name="photos.photoTwo"
                      component="h4"
                    />
                  </div>
                  <div className="add-listing-popup-field-container">
                    <label className="label" htmlFor="photoThree">
                      Photo 3
                    </label>
                    <input
                      className="inputField add-listing photo"
                      id="photoThree"
                      name="photos.photoThree"
                      type="file"
                      accept='image/*'
                      onChange={(e) =>  {
                        fileThreeSelected(e)
                        setNeedsPreviewCreated(true)
                        }}  
                    />
                    <ErrorMessage
                      className="errorMsg"
                      name="photos.photoThree"
                      component="h4"
                    />
                  </div>
                  <div className="add-listing-popup-field-container">
                    <label className="label" htmlFor="photoFour">
                      Photo 4
                    </label>
                    <input
                      className="inputField add-listing photo"
                      id="photoFour"
                      name="photos.photoFour"
                      type="file"
                      accept='image/*'
                      onChange={(e) =>  {
                        fileFourSelected(e)
                        setNeedsPreviewCreated(true)
                        }}  
                    />
                    <ErrorMessage
                      className="errorMsg"
                      name="photos.photoFour"
                      component="h4"
                    />
                  </div>
                  <div className="add-listing-popup-field-container">
                    <label className="label" htmlFor="photoFive">
                      Photo 5
                    </label>
                    <input
                      className="inputField add-listing photo"
                      id="photoFive"
                      name="photos.photoFive"
                      type="file"
                      accept='image/*'
                      onChange={(e) =>  {
                        fileFiveSelected(e)
                        setNeedsPreviewCreated(true)
                        }}  
                    />
                    <ErrorMessage
                      className="errorMsg"
                      name="photos.photoFive"
                      component="h4"
                    />
                  </div>
                </div>
                <div className="photo-preview-container">
                  <span 
                  className="prev-arrow"
                  onClick={() => {
                    setCurrentPhoto(prev => {
                      if (prev === 0) {
                        return 4;
                      }
                      return prev - 1;
                    })
                  }}
                  >&#60;</span>
                  <img
                    className="photo-preview"
                    src={photoPreviews[currentPhoto]}
                    alt="image preview"
                  />
                  <span 
                  className="next-arrow"
                  onClick={() => {
                    setCurrentPhoto(prev => {
                      if (prev === 4) {
                        return 0;
                      }
                      return prev + 1;
                    })
                  }}
                  >&#62;</span>
                </div>
              </div>
            </div>
            <div className="add-listing-bottom">
              <OutlineButton
                type='submit'
              >Create Listing</OutlineButton>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
}

export default AddListing;
