"use client"
import React, { useEffect, useState } from "react";
import {Calendar,Users,FileText, Menu,X,  
  LayoutDashboard,
  UserPlus,
  Clock,
  CalendarPlus,
  ChevronRight,
  CircleUserRound,
  Heart,
  DollarSignIcon,
  BadgeDollarSign,
  NotepadTextIcon,
  Box} from "lucide-react"
import Showdashboard from "@/Components/Showdashboard";
import DashCalender from "@/Components/Dashboard/DashCalender";
import Patients from "@/Components/Dashboard/Patients";
import Waitingroom from "@/Components/Dashboard/Waitingroom";
import Register from "@/Components/Register";
import Allappointment from "@/Components/Allappointment";
import Appointment from "@/Components/Appointment";
import StatusCard from "@/Components/Card";
import Transactions from "@/Components/Transactions";
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';
import { useSelector } from 'react-redux';
import { getallPatients } from "@/Redux/Slices/Patient/patientSlices";
import { getWaitingroom } from "@/Redux/Slices/Admin/adminSlice";
import Header from "@/Components/Header";
import Upcoming from "@/Components/Dashboard/Upcoming";
import clinic_logo from "@/Assets/clinic_logo.jpg"
import Image from "next/image";
import Healthrecord from "@/Components/Dashboard/Healthrecord";
import OTD_Billing from "@/Components/Dashboard/OTD_Billing";
import Reports from "@/Components/Dashboard/Reports";
import Inventory from "@/Components/Dashboard/Inventory";


interface NavItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  isActive: boolean;
  onClick: () => void;
  hasSubNav?: boolean;
  notification?: boolean;
}


const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isActive, onClick, hasSubNav, notification }) => (
  <button
    onClick={onClick}
    className={`
      w-full group flex items-center justify-between p-4 
      rounded-2xl transition-all duration-300 relative
      ${isActive 
        ? 'bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 shadow-lg shadow-indigo-500/30' 
        : 'hover:bg-white/10 hover:shadow-lg hover:-translate-y-0.5'
      }
    `}
  >
    <div className="flex items-center gap-3">
      <div className={`
        p-2 rounded-xl transition-all duration-300 relative
        ${isActive 
          ? 'bg-white/20' 
          : 'bg-white/5 group-hover:bg-white/10'
        }
      `}>
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-500'}`} />
        {/* {notification && <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full" />} */}
      </div>
      <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-blue-500'}`}>
        {label}
      </span>
    </div>
    {hasSubNav && (
      <ChevronRight
        className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-white' : 'text-gray-500'} ${hasSubNav ? 'rotate-90' : ''}`}
      />
    )}
  </button>
);

interface SubNavItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  onClick: () => void;
  highlight?: boolean;
}


const SubNavItem: React.FC<SubNavItemProps> = ({ icon: Icon, label, onClick, highlight }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center w-full gap-3 px-4 py-3 rounded-xl
      text-gray-600 hover:text-blue-500 text-sm transition-all
      hover:bg-white/10 hover:shadow-md hover:-translate-y-0.5
      ${highlight ? 'bg-white/5' : ''}
    `}
  >
    <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-white/10">
      <Icon className="w-4 h-4" />
    </div>
    <span className="font-medium">{label}</span>
  </button>
);

const DashboardLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [issubOpen, setsubIsOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>('Home')
  const [isSubNavOpen, setIsSubNavOpen] = useState<boolean>(true);
  const { allpatients } = useSelector((state:RootState)=>state.Patient);

  const dispatch = useAppDispatch();

  const { waitingroom } = useSelector((state:RootState)=>state.Doctor);
  const { complete } = useSelector((state:RootState)=>state.Patient);

  const waitingpatients_data = React.useMemo(() => {
    if (!waitingroom?.[0] || !complete) return 0;
    return waitingroom[0].filter(patient => !complete.includes(patient.id)).length;
  }, [waitingroom, complete]);

  let newpatients = allpatients?.filter((element:any)=>{
    return element.visit_count === 0;
  });

  let oldpatient = allpatients?.filter((element:any)=>{
    return element.visit_count > 0;
  });

  const newPatients_data = newpatients?.length || 0;
  const oldpatients_data = oldpatient?.length || 0;
  const outpatient_data = complete?.length || 0;

  useEffect(() => {
    const initializeData = async () => {
      try {
        await Promise.all([
          dispatch(getallPatients()),
          dispatch(getWaitingroom())
        ]);
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };
    initializeData();
  }, [dispatch]);
  useEffect(() => {
    const refreshWaitingRoom = async () => {
      try {
        await dispatch(getWaitingroom());
      } catch (error) {
        console.error('Error refreshing waiting room:', error);
      }
    };
    
    if (complete?.length > 0) {
      refreshWaitingRoom();
    }
  }, [dispatch, complete]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const togglesubSidebar = () => setsubIsOpen(!issubOpen)

  return (
    <>
      <div className="relative max-h-screen">
        {/* Background */}
          <div className="fixed inset-0 bg-webbg md:bg-gradient-to-r from-pink-100 to-pink-50">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-[0.15] bg-repeat bg-center"></div>
          <div className="absolute top-0 left-0 right-0 h-96 md:bg-gradient-to-b from-blue-50/50 to-transparent"></div>
        </div>
       

        <div className="relative flex min-h-screen">
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className={`fixed top-4 left-4 z-50 p-2 rounded-xl backdrop-blur-sm shadow-lg
              hover:shadow-xl transition-all duration-300 md:hidden
              ${isOpen ? 'bg-white/20' : 'bg-white/80'}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Sidebar */}
          <aside className={`
            fixed md:static inset-y-0 left-0 z-50 md:z-auto w-80
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 md:h-screen
          `}>
            <div className="h-full bg-white backdrop-blur-2xl
              border-r border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.1)]
              overflow-y-auto">
              <div className="p-6 h-full flex flex-col">
                {/* Logo Section */}
                <div className="flex items-center gap-4 mb-12">
                  <div className="relative group">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-600 to-blue-600 
                      rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300">
                    </div>
                    <div className="relative h-full w-14 bg-gradient-to-br from-green-600 to-green-400 
                      rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-all">
                      <Image src={clinic_logo} width={1000} height={1200} alt="clinic_logo"></Image>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-clip-text text-transparent 
                      bg-gradient-to-r from-violet-600 to-blue-600">
                      VedgarbhaAyurveda
                    </h2>
                    <p className="text-sm text-gray-500">Doctor Dashboard</p>
                  </div>
                  <X onClick={toggleSidebar} 
                    className="md:hidden ml-auto cursor-pointer hover:text-blue-500 transition-all" />
                </div>
                 

                  {/* decoration */}
                {/* <div className="fixed inset-0 -z-10">
                <div className="absolute top-0 -left-32 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-500 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
              </div> */}

                {/* User Profile */}
                <div className="mb-8 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center">
                        <CircleUserRound className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Dr. Pallavi Chindhe</h3>
                      <p className="text-xs text-gray-500">Ayurveda Gynaecologist</p>
                    </div>
                  </div>
                </div>

                {/* Navigation - Make it scrollable */}
                <nav className="space-y-3 flex-grow overflow-y-auto scrollbar-hide">
                  <NavItem 
                    icon={LayoutDashboard} 
                    label="Dashboard" 
                    isActive={activeItem === 'Home'}
                    onClick={() => setActiveItem('Home')}
                  />

                  <div className="space-y-2">
                    <NavItem 
                      icon={Users} 
                      label="Patients" 
                      isActive={activeItem === 'allpatients'}
                      onClick={() =>{setIsSubNavOpen(!isSubNavOpen),setActiveItem("allpatients")}}
                      hasSubNav
                      notification={true}
                      
                    />
                    
                    {isSubNavOpen && (
                      <div className="ml-4 pl-4 border-l-2 border-blue-100/20 space-y-2">
                        <SubNavItem 
                          icon={Users} 
                          label="All Patients" 
                          onClick={() => setActiveItem('allpatients')}
                        />
                        <SubNavItem 
                          icon={Clock} 
                          label="Waiting Room" 
                          onClick={() => setActiveItem('waitingroom')}
                          highlight={true}
                        />                     
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <NavItem 
                      icon={Users} 
                      label="Appointments" 
                      isActive={activeItem === 'appointments'}
                      onClick={()=>{togglesubSidebar(),setActiveItem("upcoming")}}
                      hasSubNav
                      notification={true}
                    />
                    
                    {issubOpen && (
                      <div className="ml-4 pl-4 border-l-2 border-blue-100/20 space-y-2">
                      
                        <SubNavItem 
                          icon={Clock} 
                          label="upcoming " 
                          onClick={() => setActiveItem('upcoming')}
                          highlight={true}
                        />   
                    
                        <SubNavItem 
                          icon={UserPlus} 
                          label="All appointments" 
                          onClick={() => setActiveItem('allappointments')}
                        />
                      </div>
                    )}
                  </div>

                  <NavItem 
                    icon={Calendar} 
                    label="Calendar" 
                    isActive={activeItem === 'Calendar'}
                    onClick={() => setActiveItem('Calendar')}
                  />

                  <NavItem 
                    icon={DollarSignIcon} 
                    label="Transactions" 
                    isActive={activeItem === 'Transactions'}
                    onClick={() => setActiveItem('Transactions')}
                  />

                  <NavItem 
                    icon={Heart} 
                    label="Health" 
                    isActive={activeItem === 'health'}
                    onClick={() => setActiveItem('health')}
                  />

                    <NavItem 
                    icon={BadgeDollarSign} 
                    label="Billing" 
                    isActive={activeItem === 'billing'}
                    onClick={() => setActiveItem('billing')}
                  />

                   <NavItem 
                    icon={NotepadTextIcon} 
                    label="Reports" 
                    isActive={activeItem === 'reports'}
                    onClick={() => setActiveItem('reports')}
                  />

                    <NavItem 
                    icon={Box} 
                    label="Inventory" 
                    isActive={activeItem === 'inventory'}
                    onClick={() => setActiveItem('inventory')}
                  />
                </nav>

                {/* Bottom Section - Pro Badge */}
                <div className="mt-auto pt-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-600/10 to-blue-600/10 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600">
                        <span className="text-xs font-bold text-white">PRO</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Healthcare software</p>
                        <p className="text-xs text-gray-500">The digitech solutions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-h-screen overflow-y-auto p-4">
          <Header/>
            <div className="container mx-auto p-4 contents ">
              {activeItem === 'Home' && (
                <>
                  <div className="bg-white rounded-xl shadow-xl p-6 backdrop-blur-sm border border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/30">
                        <div className="p-3 rounded-lg bg-blue-500/10 mr-4">
                          <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-600">Waiting Patients</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-blue-600">{waitingpatients_data}</span>
                            <span className="text-sm text-gray-500">patients</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200/30">
                        <div className="p-3 rounded-lg bg-green-500/10 mr-4">
                          <UserPlus className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-600">New Patients</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-green-600">{newPatients_data}</span>
                            <span className="text-sm text-gray-500">patients</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200/30">
                        <div className="p-3 rounded-lg bg-purple-500/10 mr-4">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-600">Follow-up Patients</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-purple-600">{oldpatients_data}</span>
                            <span className="text-sm text-gray-500">patients</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dash w-full ">
                    <Showdashboard />
                  </div>
                </>
              )}
              
              <div className="w-full ">
                {
                  activeItem === "Calendar" ? <DashCalender /> : 
                  activeItem === "Patients" ? <Appointment show={true} /> : 
                  activeItem === "allpatients" ? <Patients /> : 
                  activeItem === "waitingroom" ? <Waitingroom /> : 
                  activeItem === "register" ? <Register show={true} /> : 
                  activeItem === "allappointments" ? <Allappointment /> : 
                  activeItem === "Transactions" ? <Transactions/> :
                  activeItem === "upcoming"? <Upcoming/> :
                  activeItem === "health"? <Healthrecord/>:
                  activeItem === "billing"? <OTD_Billing/>:
                  activeItem === "reports"? <Reports/> :
                  activeItem === "inventory"?<Inventory/> : null
                }
              </div>
            </div>
          </main>

  

          {/* Mobile Overlay */}
          {isOpen && (
            <div
              className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden `}
              onClick={toggleSidebar}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;



