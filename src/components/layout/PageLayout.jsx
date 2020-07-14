// import { Amplitude, LogOnMount } from '@amplitude/react-amplitude'
// import classnames from 'classnames';
// import { NextRouter, useRouter } from 'next/router';
// import React, { useState } from 'react';
// import ErrorPage from '../../pages/_error';
// import { SoftPageProps } from '../../types/pageProps/SoftPageProps';
// import Sentry from '../../utils/monitoring/sentry';
// import DefaultErrorLayout from '../errors/DefaultErrorLayout';
// import DefaultPageContainer from './DefaultPageContainer';
// import Footer from './Footer';
// import Head, { HeadProps } from './Head';
// import Nav from './Nav';
// import PreviewModeBanner from './PreviewModeBanner';
// import PropTypes from 'prop-types'

// const fileLabel = 'components/pageLayouts/DefaultLayout';
// const logger = createLogger({
//   label: fileLabel,
// });

// PageLayout.propTypes = {
//   children: PropTypes.node,isRequired,
//   headProps: PropTypes.object.isRequired,
//   pageName: PropTypes.string.isRequired,
//   isInIframe: PropTypes.bool,
//   error: PropTypes.object,
// };

// /**
//  * Handles the positioning of top-level elements within the page
//  *
//  * It does the following:
//  *  - Adds a Nav/Footer component, and the dynamic Next.js "Page" component in between
//  *  - Optionally, it can also display a left sidebar (i.e: used within examples sections)
//  *  - Automatically track page views (Amplitude)
//  *  - Handles errors by displaying the Error page, with the ability to contact technical support (which will send a Sentry User Feedback)
//  *
//  * @param props
//  */
// function PageLayout (props) {
//   const {
//     children,
//     error,
//     isInIframe = false, // Won't be defined server-side
//     headProps = {},
//     pageName,
//     Sidebar,
//   } = props;

//   const router = useRouter();
//   const isIframeWithFullPagePreview = router?.query?.fullPagePreview === '1';

//   Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
//     category: 'fileLabel',
//     message: `Rendering ${fileLabel} for page ${pageName}`,
//     level: Sentry.Severity.Debug,
//   });

//   return (
//     <Amplitude
//       eventProperties={(inheritedProps) => ({
//         ...inheritedProps,
//         page: {
//           ...inheritedProps.page,
//           name: pageName,
//         },
//       })}
//     >
//       <Head {...headProps} />
//       <LogOnMount eventType="page-displayed" />

//       {/* Loaded from components/Head - See https://github.com/mikemaccana/outdated-browser-rework */}
//       {/*<div*/}
//       {/*  id="outdated"*/}
//       {/*  style={{ display: 'none' }}*/}
//       {/*></div>*/}

//       {
//         (!isInIframe || isIframeWithFullPagePreview) && (
//           <Nav />
//         )
//       }

//       <div
//         className={classnames('page-wrapper', isInIframe ? 'is-in-iframe' : 'not-in-iframe')}
//       >
//         {
//           // If an error happened, we display it instead of displaying the page
//           // We display a custom error instead of the native Next.js error by providing children (removing children will display the native Next.js error)
//           error ? (
//             <ErrorPage
//               statusCode={500}
//               isReadyToRender={true}
//               err={error}
//             >
//               <DefaultErrorLayout
//                 error={error}
//               />
//             </ErrorPage>
//           ) : (
//             <DefaultPageContainer>
//               {children}
//             </DefaultPageContainer>
//           )
//         }
//       </div>

//       {
//         (!isInIframe || isIframeWithFullPagePreview) && (
//           <Footer />
//         )
//       }
//     </Amplitude>
//   );
// };

// export default PageLayout;
