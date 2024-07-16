const AuthLayout = ({ 
  children
}: { 
  children: React.ReactNode
}) => {
  return ( 
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
          <div className="flex min-h-screen items-center justify-center  py-6 sm:py-12">
  <div className="mx-auto max-w-4xl overflow-hidden rounded-md bg-white shadow">
    <div className="grid grid-cols-2">
 
      <div className="col-span-2 md:col-span-1">
        <div className="flex h-full flex-col justify-center">
      
      {children}
        </div>
      </div>
      <div className=" col-span-1 hidden md:block">
        <div className=" inset-0"></div>
        <img className="h-full w-full object-cover" src="/rentx.jpg" alt="" />
      </div>
    </div>
  </div>

</div>
    </div>
   );
}
 
export default AuthLayout;