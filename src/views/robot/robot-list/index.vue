<template>
  <div class="app-container">
    <div>
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        Excel 다운로드
      </el-button>
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" icon="el-icon-document" @click="modelSensorDrawer = true">
        모델/센서 정보
      </el-button>
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="success" round @click="$router.push('/robot/add-robot')">
        로봇 추가
      </el-button>
    </div>

    <el-table v-loading="listLoading" class="robot-list-table" :data="list" element-loading-text="Loading..." border fit highlight-current-row @row-click="showRobotInfoDrawer">
      <el-table-column align="center" label="Id" width="50">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="로봇 Id" width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.robot_id }}
        </template>
      </el-table-column>
      <el-table-column label="로봇 IP 주소" width="120" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.robot_ip }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="모델명" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.model }}
        </template>
      </el-table-column>
      <el-table-column label="사이트 Id" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.row.site_id }}
        </template>
      </el-table-column>
      <el-table-column label="사이트명" align="center">
        <template slot-scope="scope">
          {{ scope.row.site_name }}
        </template>
      </el-table-column>
      <el-table-column label="상태" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="배터리" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.battery+"%" }}
        </template>
      </el-table-column>
      <el-table-column label="센서" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.sensors[0] }}
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      id="modelSensorDrawer"
      title="모델/센서 정보"
      :visible.sync="modelSensorDrawer"
      direction="btt"
      size="70%"
    >
      <h1>Models</h1>
      <h2>Spot</h2>
      <p>Spot is ...</p>
      <h2>Husky</h2>
      <p>Husky is ...</p>
      <h1>Sensors</h1>
      <h2>3D LiDAR</h2>
      <h2>360 Camer</h2>
    </el-drawer>

    <el-drawer
      id="robotInfoDrawer"
      :title="'로봇 '+robotInfo.robot_id+'('+robotInfo.model+') 정보'"
      :visible.sync="robotInfoDrawer"
      direction="rtl"
      size="40%"
    >
      <div class="drawer-container">

        <div>
          <label>Robot ID: {{ robotInfo.robot_id }}</label><br>
          <label>IP Address: {{ robotInfo.robot_ip }}</label><br>
          <label>Robot Model: {{ robotInfo.model }}</label><br>
        </div>
        <br>
        <el-button @click="$router.push('/robot/robot-dashboard')">Robot Dashboard</el-button>
        <el-button @click="$router.push('/robot/robot-operation')">Robot Operation</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { fetchList } from '@/api/robot'
import { parseTime } from '@/utils'
// options component

export default {
  name: 'ExportExcel',
  data() {
    return {
      modelSensorDrawer: false,
      robotInfoDrawer: false,
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      robotInfo: {
        robot_id: '',
        robot_ip: '',
        model: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    showRobotInfoDrawer(row) {
      console.log(row)
      this.robotInfoDrawer = true
      this.robotInfo = row
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Id', 'Robot Id', 'Robot IPv4', 'Model', 'Site Id', 'Site Name', 'Status', 'Battery', 'Sensors']
        const filterVal = ['id', 'robot_id', 'robot_ip', 'model', 'site_id', 'site_name', 'status', 'battery', 'sensors']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style>

.drawer-container {
  padding: 20px;
}

.robot-list-table {
  font-size: 12px;
}

.radio-label {
  font-size: 12px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}

#modelSensorDrawer {

}
</style>
