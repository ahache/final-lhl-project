import React from 'react'
import ReactDOMServer from 'react-dom/server'

class InfoWindow extends React.Component {

  componentDidUpdate(prevProps) {
    const {google, map} = this.props;

    if (!google || !map) {
      return;
    }
    // Case 1: Map instance has become available
    if (this.props.map !== prevProps.map) {
      this.renderInfoWindow();
    }

    // Case 2: Content of InfoWindow has been updated
    if (this.props.children !== prevProps.children) {
      this.updateContent();
    }

    // Case 3: Visibility of the InfoWindow has changed
    if ((this.props.visible !== prevProps.visible) ||
    (this.props.marker !== prevProps.marker)) {
      this.props.visible ? this.openWindow() : this.closeWindow();
    }
  }

  openWindow() {
    this.infowindow.open(this.props.map, this.props.marker);
    let buttonFind = document.getElementById("favorite");
    if (buttonFind) {
      buttonFind.addEventListener("click", this.props.addFavorite, false)
    }
  }

  closeWindow() {
    let buttonFind = document.getElementById("favorite");
    if(buttonFind)
    {
      buttonFind.removeEventListener("click", this.props.addFavorite, false)
    }
    this.infowindow.close();
  }


  updateContent() {
    // InfoWindow requires us to set content in order for us to show in the browser
    // When we want to show the window, we'll use the children of the <InfoWindow />
    // component to define what the instance should be
    const content = this.renderChildren();
    this.infowindow.setContent(content);

    // add event listener to table
  }


  renderChildren() {
    const {children} = this.props;
    return ReactDOMServer.renderToString(children);
  }

  renderInfoWindow() {
    let {map, google, mapCenter} = this.props;

    const infoWindow = this.infowindow = new google.maps.InfoWindow({
      content: ''
    });
;
    google.maps.event.addListener(infoWindow, 'closeClick', this.onClose.bind(this));
    google.maps.event.addListener(infoWindow, 'domready', this.onOpen.bind(this));
  }

  onOpen() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  onClose() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    return null;
  }
}

InfoWindow.defaultProps = {
  visible: false
}

export default InfoWindow;