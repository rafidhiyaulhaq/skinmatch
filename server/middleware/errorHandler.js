const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    
    // Log error untuk debugging
    console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    
    res.status(status).json({ 
      status: 'error',
      message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
  };
  
  module.exports = errorHandler;