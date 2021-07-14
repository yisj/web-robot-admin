<template>
  <div class="app-container">

    <div>
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
        Excel 다운로드
      </el-button>
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" icon="el-icon-document" @click="modelSensorDrawer = true">
        Model & Sensor Info.
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>
      <el-table-column align="center" label="Id" width="50">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Robot Id" width="90" align="center">
        <template slot-scope="scope">
          {{ scope.row.robot_id }}
        </template>
      </el-table-column>
      <el-table-column label="Robot IPv4" width="120" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.robot_ip }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Model" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.model }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Site Id" width="100">
        <template slot-scope="scope">
          {{ scope.row.site_id }}
        </template>
      </el-table-column>
      <el-table-column label="Site Name" align="center">
        <template slot-scope="scope">
          {{ scope.row.site_name }}
        </template>
      </el-table-column>
      <el-table-column label="Status" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="Battery" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.battery+"%" }}
        </template>
      </el-table-column>
      <el-table-column label="Sensors" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.sensors[0] }}
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      id="modelSensorDrawer"
      title="Model & Sensor Info."
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
      title="Robot Info."
      :visible.sync="robotDrawer"
      direction="rtl"
      size="50%"
    >
      <h1>Robot Detail Info</h1>
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
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx'
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
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}

#modelSensorDrawer {

}
</style>
