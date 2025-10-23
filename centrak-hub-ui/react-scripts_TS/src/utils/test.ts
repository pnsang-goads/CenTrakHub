import { Box } from '@mui/system';
import {
  ContentMap,
  ContentRight,
  PositionContainer,
  TitletRight,
  UserAvatar,
  UserHeading,
  UserInfo,
  UserInfoDetail,
  UserInfoLeft,
  UserInfoRight,
  UserItem,
  UserLabel,
  UserQuality,
  Wrapper,
} from './styled';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TrackingFilter from './Filter';

// Image
import avatar from '../../../assets/dashboardCustomer/position/avatar_driver.png';

import * as signalR from '@microsoft/signalr';
import { RequestLocation } from 'src/redux/slices/location';
import { dispatch } from 'src/redux/store';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const Position = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8',
  });

  const image = '/assets/icons/icon-driver.svg';

  const trackingData = [
    { lat: 40.748817, lng: -73.985428 },
    { lat: 41.748817, lng: -72.985428 },
    { lat: 42.748817, lng: -71.985428 },
  ];

  const [map, setMap] = useState(null); // eslint-disable-line
  const [driverLocation, setDriverLocation] = useState<any>([]); // eslint-disable-line
  const [driverActive, setDriverActive] = useState<any>(); // eslint-disable-line
  const [newInfoSocket, setNewInfoSocket] = useState<any>([]); // eslint-disable-line
  const [isRender, setIsRender] = useState(true); // eslint-disable-line
  const [driverLocationDelay, setDriverLocationDelay] = useState<any>([]); // eslint-disable-line

  let currentPosition: any = null;

  const center = useMemo(() => {
    if (driverLocation.length > 0) {
      return driverLocation[0];
    } else {
      return { lat: 10.8287286, lng: 106.6797673 };
    }
  }, [driverLocation]);

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  // --------------------SOCKET---------------------
  const accessToken: any = localStorage.getItem('accessToken');
  const hubConnectionPosition = new signalR.HubConnectionBuilder()
    .withUrl('https://ebook-auth-staging.uniorbit.dev/v1/driver-tracking-hub', {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: () => (accessToken ? accessToken : null),
    })
    .build();

  hubConnectionPosition.start().then((res: any) => {
    if (hubConnectionPosition.connectionId) {
      hubConnectionPosition.invoke('DriverLocation', hubConnectionPosition.connectionId);
    }
  });

  const loadDriverActive = async () => {
    const res = await dispatch(RequestLocation('0'));
    const driverData: any = res.payload.map((id: any) => ({ id, location: {} }));
    setDriverActive([...driverData]);
  };

  useEffect(() => {
    loadDriverActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInterval(() => {
      setIsRender(false);
    }, 10000);
  }, []);

  useEffect(() => {
    if (!isRender) {
      setIsRender(true);
    }
  }, [isRender]);

  useEffect(() => {
    const newDriverLocation: any = driverActive?.map((driver: any) => {
      if (driver.id === newInfoSocket?.accountId) {
        return {
          id: driver.id,
          location: {
            lat: newInfoSocket?.coords?.latitude,
            lng: newInfoSocket?.coords?.longitude,
          },
        };
      } else {
        return driver;
      }
    });

    if (newDriverLocation) {
      setDriverActive(newDriverLocation);
      const newMarkerArray = newDriverLocation?.map((driver: any) => driver?.location) || [];
      setDriverLocation(newMarkerArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newInfoSocket]);

  var d = new Date();
  var n = d.toLocaleTimeString();
  console.log('log render n: ', n);

  // useEffect(() => {
  //   const connection = new signalR.HubConnectionBuilder()
  //     .withUrl('https://ebook-auth-staging.uniorbit.dev/v1/driver-tracking-hub', {
  //       skipNegotiation: true,
  //       transport: signalR.HttpTransportType.WebSockets,
  //       accessTokenFactory: () => (accessToken ? accessToken : null),
  //     })
  //     .build();
  //   // Start the connection
  //   connection
  //     .start()
  //     .then(() => {
  //       console.log('Connection established');
  //     })
  //     .catch((err) => {
  //       console.error('Error establishing connection:', err);
  //     });

  //   // Add event listener for receiving data
  //   connection.on('DriverLocation', (data) => {
  //     // Handle the received data
  //     console.log('Received data:', data);
  //     // setNewInfoSocket(data);
  //     // setReceivedData(data);
  //     const newDriverLocation: any = driverActive?.map((driver: any) => {
  //       if (driver.id === data?.accountId) {
  //         return {
  //           id: driver.id,
  //           location: {
  //             lat: data?.coords?.latitude,
  //             lng: data?.coords?.longitude,
  //           },
  //         };
  //       } else {
  //         return driver;
  //       }
  //     });

  //     if (newDriverLocation) {
  //       const newMarkerArray = newDriverLocation?.map((driver: any) => driver?.location) || [];
  //       console.log('log newMarkerArray: ', newMarkerArray);
  //       setDriverLocation(newMarkerArray);
  //     }
  //   });

  //   // Set up a timer to request data every 10 seconds
  //   const timerId = setInterval(() => {
  //     // Send a request for data, assuming there is a server method to provide data
  //     connection.invoke('DriverLocation').catch((err) => console.error(err));
  //   }, 10000); // 10 seconds

  //   // Clean up the connection and timer when the component unmounts
  //   return () => {
  //     clearInterval(timerId);
  //     // connection.stop();
  //   };
  // }, []);

  return (
    <PositionContainer>
      <Wrapper>
        <TrackingFilter />
        <ContentRight>
          <TitletRight>Vị Trí Tài Xế</TitletRight>
          <ContentMap>
            <Box height={'100%'}>
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  zoom={8}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {/* {driverLocation?.map((item: any, index: number) => {
                    return <Marker key={index} position={item} icon={image} />;
                  })} */}
                  {isRender &&
                    driverLocation?.map((item: any, index: number) => {
                      return <Marker key={index} position={item} icon={image} />;
                    })}
                  {/* {driverLocationDelay?.map((item: any, index: number) => {
                    return <Marker key={index} position={item} icon={image} />;
                  })} */}
                </GoogleMap>
              ) : (
                <></>
              )}
            </Box>
          </ContentMap>
          <TitletRight>Thông Tin Tài Xế</TitletRight>
          <UserInfo>
            <UserInfoLeft>
              <UserAvatar>
                <img src={avatar} alt="" width={110} />
                <UserQuality>4.9</UserQuality>
              </UserAvatar>
              <UserInfoDetail>
                <UserItem>
                  <UserLabel>TÀI XẾ</UserLabel>
                  <UserHeading>Đinh Phan Nhật Nam</UserHeading>
                </UserItem>
                <UserItem>
                  <UserLabel>MÃ TÀI XẾ</UserLabel>
                  <UserHeading>16346126</UserHeading>
                </UserItem>
              </UserInfoDetail>
            </UserInfoLeft>
            <UserInfoRight>
              <UserItem>
                <UserLabel>LƯỢT TIẾP CẬN</UserLabel>
                <UserHeading>50.000.000</UserHeading>
              </UserItem>
              <UserItem>
                <UserLabel>LƯỢT HIỂN THỊ</UserLabel>
                <UserHeading>2.000.000</UserHeading>
              </UserItem>
              <UserItem>
                <UserLabel>SỐ KM ĐÃ CHẠY</UserLabel>
                <UserHeading>22.000.000</UserHeading>
              </UserItem>
              <UserItem>
                <UserLabel>KHU VỰC</UserLabel>
                <UserHeading>QUẬN 7</UserHeading>
              </UserItem>
            </UserInfoRight>
          </UserInfo>
        </ContentRight>
      </Wrapper>
    </PositionContainer>
  );
};

export default Position;
