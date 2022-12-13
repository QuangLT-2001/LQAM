import LishMent from '../Pages/LishMent/lishMent';
import ManagerTodo from 'Pages/managerTodo';
import Contract from 'Pages/typeContract';
import { v4 as uuidv4 } from 'uuid';
import TTTC from 'Pages/TTTC/tttc';
import TTTCDetail from 'Pages/TTTC/detail';
import TimerWork from 'Pages/Glv/timerWork';
import TimerWorkEdit from 'Pages/Glv/timerWorkEdit';
import MapWorkList from 'Pages/mapWork/mapWorkList';
import ManagerCourseList from 'Pages/ManagerCourse/managerCourseList';
import ManagerCourseEdit from 'Pages/ManagerCourse/managerCourseEdit';
import ManagerCourseDetail from 'Pages/ManagerCourse/managerCourseDetail';
export interface RouterItem {
     id: string| number;
     path: string;
     pageTitle?: string;
     mainMenuTitle?: string;
     subMenuTitle?: string;
     mainMenuKey?: string;
     persmissions?: string;
     getPageElement: Function;
     subMenuDrop?: string
}
export const RouterList: RouterItem[] = [
     {
          id: uuidv4(),
          path: "/",
          mainMenuKey: "",
          pageTitle: "Dashboard",
          getPageElement: () => <ManagerTodo />
     },
     {
          id: uuidv4(),
          path: "/KPI/",
          mainMenuKey: "KPI",
          persmissions: "",
          mainMenuTitle: "KPI",
          subMenuDrop: "",
          getPageElement: () => <ManagerTodo />
     },
     {
          id: uuidv4(),
          path: "/nhan-su/",
          mainMenuKey: "NS",
          persmissions: "",
          mainMenuTitle: "Nhân sự",
          subMenuDrop: "",
          getPageElement: () => <ManagerTodo />
     },
     {
          id: uuidv4(),
          path: "/dao-tao/quan-ly-khoa-dao-tao/",
          mainMenuKey: "DT",
          persmissions: "",
          mainMenuTitle: "Đào tạo",
          subMenuDrop: "",
          subMenuTitle: "Quản lý khóa đào tạo",
          getPageElement: () => <ManagerCourseList />
     },
     {
          id: uuidv4(),
          path: "/dao-tao/quan-ly-khoa-dao-tao/:id",
          mainMenuKey: "DT",
          persmissions: "",
          mainMenuTitle: "",
          subMenuDrop: "",
          subMenuTitle: "",
          getPageElement: () => <ManagerCourseEdit />
     },
     {
          id: uuidv4(),
          path: "/dao-tao/quan-ly-khoa-dao-tao/detail/:id",
          mainMenuKey: "DT",
          persmissions: "",
          mainMenuTitle: "",
          subMenuDrop: "",
          subMenuTitle: "",
          getPageElement: () => <ManagerCourseDetail />
     },
     {
          id: uuidv4(),
          path: "/dao-tao/quan-ly-khoa-dao-tao/detail/",
          mainMenuKey: "DT",
          persmissions: "",
          mainMenuTitle: "",
          subMenuDrop: "",
          subMenuTitle: "",
          getPageElement: () => <ManagerCourseDetail />
     },
     {
          id: uuidv4(),
          path: "/dao-tao/hoc-va-kiem-tra/",
          mainMenuKey: "DT",
          persmissions: "",
          mainMenuTitle: "",
          subMenuDrop: "",
          subMenuTitle: "Học và kiểm tra",
          getPageElement: () => <ManagerTodo />
     },
     {
          id: uuidv4(),
          path: "/dao-tao/bao-cao-ket-qua-dao-tao/",
          mainMenuKey: "DT",
          persmissions: "",
          mainMenuTitle: "",
          subMenuDrop: "",
          subMenuTitle: "Báo cáo kết quả đào tạo",
          getPageElement: () => <ManagerTodo />
     },

     {
          id: uuidv4(),
          path: "/quan-tri/quan-ly-nguoi-dung/",
          mainMenuKey: "QT",
          persmissions: "",
          mainMenuTitle: "",
          subMenuTitle: "Quản lý người dùng",
          subMenuDrop: "",
          getPageElement: () => <Contract />
     },
     {
          id: uuidv4(),
          path: "/quan-tri/phan-quyen/",
          mainMenuKey: "QT",
          persmissions: "",
          mainMenuTitle: "",
          subMenuTitle: "Phân quyền",
          subMenuDrop: "",
          getPageElement: () => <Contract />
     },

     {
          id: uuidv4(),
          path: "/quan-tri/thiet-lap-to-chuc/danh-sach-to-chuc/",
          mainMenuKey: "QT",
          persmissions: "",
          mainMenuTitle: "",
          subMenuDrop: "Danh sách tổ chức",
          subMenuTitle: "Thiết lập tổ chức",
          getPageElement: () => <LishMent />
     },
     {
          id: uuidv4(),
          path: "/quan-tri/thiet-lap-to-chuc/thong-tin-to-chuc/",
          mainMenuTitle: "",
          mainMenuKey: "QT",
          persmissions: "",
          subMenuDrop: "Thông tin tổ chức",
          subMenuTitle: "",
          getPageElement: () => <TTTC />
     },
     {
          id: uuidv4(),
          path: "/quan-tri/thiet-lap-to-chuc/thong-tin-to-chuc/:id",
          mainMenuTitle: "",
          mainMenuKey: "QT",
          persmissions: "",
          subMenuDrop: "",
          subMenuTitle: "",
          getPageElement: () => <TTTCDetail />
     },
     {
          id: uuidv4(),
          path: "/quan-tri/thiet-lap-to-chuc/gio-lam-viec/",
          mainMenuTitle: "",
          mainMenuKey: "QT",
          persmissions: "",
          subMenuDrop: "Giờ làm việc",
          subMenuTitle: "",
          getPageElement: () => <TimerWork />
     },
     {
          id: uuidv4(),
          path: "/quan-tri/thiet-lap-to-chuc/gio-lam-viec/:id",
          mainMenuTitle: "",
          mainMenuKey: "QT",
          persmissions: "",
          subMenuDrop: "",
          subMenuTitle: "",
          getPageElement: () => <TimerWorkEdit />
     },
     {
          id: uuidv4(),
          path: "/quan-tri/thiet-lap-to-chuc/dia-diem-lam-viec/",
          mainMenuTitle: "",
          mainMenuKey: "QT",
          persmissions: "",
          subMenuDrop: "Địa điểm làm việc",
          subMenuTitle: "",
          getPageElement: () => <MapWorkList />
     },
     {
          id: uuidv4(),
          path: "/quan-tri/thiet-lap-to-chuc/nhom-nhan-vien/",
          mainMenuTitle: "",
          mainMenuKey: "QT",
          persmissions: "",
          subMenuDrop: "Nhóm nhân viên",
          subMenuTitle: "",
          getPageElement: () => <Contract />
     },
      {
          id: uuidv4(),
          path: "/quan-tri/quan-ly-phong-ban/",
          mainMenuTitle: "",
          mainMenuKey: "QT",
          persmissions: "",
          subMenuDrop: "",
          subMenuTitle: "Quản lý phòng ban",
          getPageElement: () => <Contract />
      },
      {
          id: uuidv4(),
          path: "/quan-tri/quan-ly-chuc-danh/",
          mainMenuTitle: "",
          mainMenuKey: "QT",
          persmissions: "",
          subMenuDrop: "",
          subMenuTitle: "Quản lý chức danh",
          getPageElement: () => <Contract />
      },
      {
          id: uuidv4(),
          path: "/quan-tri/loai-hop-dong/",
          mainMenuTitle: "Quản trị",
          mainMenuKey: "QT",
          persmissions: "",
          subMenuDrop:"",
          subMenuTitle: "Loại hợp đồng",
          getPageElement: () => <Contract />
      },
      {
          id: uuidv4(),
          path: "/quan-tri/quan-ly-ly-do-nghi-viec/",
          mainMenuTitle: "",
          mainMenuKey: "QT",
          persmissions: "",
          subMenuDrop: "",
          subMenuTitle: "Quản lý lý do nghỉ việc",
          getPageElement: () => <ManagerTodo />
      }
]