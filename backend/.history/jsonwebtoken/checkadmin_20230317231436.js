function requireAdmin(req, res, next) {
    var currentUserRole=".."; //get current user role
    if( currentUserRole == 'ROLE_ADMIN')
     {
         next();
     }
     else{
          next(new Error("Permission denied."));
    return;
     }  
};